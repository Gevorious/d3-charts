import { arc, pie, PieArcDatum, scaleOrdinal, sum } from 'd3';
import { useState } from 'react';
import { PieChartProps } from './types';
import Arc from './_partials/Arcs';
import ListItem from './_partials/ListItem';
import { PIE_COLORS } from './_constants';
import './styles.scss';

const PieChart = <T,>({
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

  const filteredData = data.filter((item) =>
    visibleItems.includes(item[keyField] as string),
  );

  const radius = Math.min(width, height) / 2.1;

  const pieObject = pie<T>().value((d) => +d[valueField]);
  const arcEl = arc<PieArcDatum<T>>().innerRadius(0).outerRadius(radius);

  const color = scaleOrdinal<string>()
    .domain(data.map((d) => String(d[keyField])))
    .range(PIE_COLORS);

  const colorByKey = new Map<string, string>();
  data.forEach((item) => {
    const key = String(item[keyField]);
    colorByKey.set(key, color(key));
  });

  const arcs = pieObject(filteredData);
  const total = sum(arcs, (d) => d.value);

  const onHover = (key?: string) => {
    if (filteredData.length <= 1) {
      setHoveredKey(null);
      return;
    }

    setHoveredKey(key || null);
  };

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${radius + 50}, ${height / 2})`}>
        {arcs.map((arcDatum, i) => {
          const percentage = ((arcDatum.value / total) * 100).toFixed(1);
          const key = String(arcDatum.data[keyField]);
          const [cx, cy] = arcEl.centroid(arcDatum);
          const offset = hoveredKey === key ? 15 : 0;

          const dx = cx * (offset / radius);
          const dy = cy * (offset / radius);
          return (
            <g
              key={key}
              transform={`translate(${dx}, ${dy})`}
              style={{ transition: 'transform 0.2s ease-in-out' }}
              onMouseEnter={() => onHover(key)}
              onMouseLeave={() => onHover()}
            >
              <Arc
                arc={arcEl}
                arcDatum={arcDatum}
                color={colorByKey.get(String(arcDatum.data[keyField]))!}
                title={`${arcDatum.data[keyField]}: ${percentage}%`}
              />
            </g>
          );
        })}
      </g>
      <g transform={`translate(${width - 250}, 20)`}>
        {data.map((item, i) => {
          const iconSize = (height - 60) / data.length / 1.2;
          const key = String(item[keyField]);

          return (
            <g
              key={key}
              transform={`translate(0, ${i * iconSize * 1.2})`}
              onMouseEnter={() => onHover(key)}
              onMouseLeave={() => onHover()}
            >
              <ListItem
                onClick={() =>
                  setVisibleItems((prev) =>
                    prev.includes(key)
                      ? prev.filter((item) => item !== key)
                      : [...prev, key],
                  )
                }
                iconSize={iconSize}
                checked={!visibleItems.includes(key)}
                name={key}
                value={+item[valueField]}
                color={colorByKey.get(key)!}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default PieChart;
