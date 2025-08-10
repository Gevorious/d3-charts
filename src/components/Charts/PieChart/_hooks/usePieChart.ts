import { useState, useMemo } from 'react';
import { arc, pie, PieArcDatum, scaleOrdinal, sum } from 'd3';
import { PieChartProps } from '../types';
import { PIE_COLORS } from '../_constants';
import { calculateRadius } from '../_utils';

export const usePieChart = <T>({
  data,
  keyField,
  valueField,
  width = 800,
  height = 600,
}: PieChartProps<T>) => {
  const [visibleItems, setVisibleItems] = useState(
    data.map((item) => item[keyField] as string),
  );
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const filteredData = useMemo(
    () =>
      data.filter((item) => visibleItems.includes(item[keyField] as string)),
    [data, visibleItems, keyField],
  );

  const radius = useMemo(() => calculateRadius(width, height), [width, height]);

  const pieObject = useMemo(
    () => pie<T>().value((d) => +d[valueField]),
    [valueField],
  );

  const arcEl = useMemo(
    () => arc<PieArcDatum<T>>().innerRadius(0).outerRadius(radius),
    [radius],
  );

  const color = useMemo(
    () =>
      scaleOrdinal<string>()
        .domain(data.map((d) => String(d[keyField])))
        .range(PIE_COLORS),
    [data, keyField],
  );

  const colorByKey = useMemo(() => {
    const map = new Map<string, string>();
    data.forEach((item) => {
      const key = String(item[keyField]);
      map.set(key, color(key));
    });
    return map;
  }, [data, keyField, color]);

  const arcs = useMemo(
    () => pieObject(filteredData),
    [pieObject, filteredData],
  );

  const total = useMemo(() => sum(arcs, (d) => d.value), [arcs]);

  const onHover = (key?: string) => {
    if (filteredData.length <= 1) {
      setHoveredKey(null);
      return;
    }
    setHoveredKey(key || null);
  };

  const onToggleItem = (key: string) => {
    setVisibleItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  return {
    filteredData,
    radius,
    arcEl,
    colorByKey,
    arcs,
    total,
    hoveredKey,
    onHover,
    onToggleItem,
    visibleItems,
  };
};
