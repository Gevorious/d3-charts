import { useState } from 'react';
import { useColorMap } from '../../../../hooks/useColorMap';

export const useAreaChart = <T extends Record<string, any>>(
  data: T[],
  config: { valueKeys: (keyof T)[]; xKey: keyof T },
) => {
  const { valueKeys, xKey } = config;
  const [visibleData, setVisibleData] = useState(valueKeys);

  const { [xKey]: _, ...rest } = data[0];
  const colorMap = useColorMap(rest);

  const toggle = (val: string) => {
    if (visibleData.includes(val)) {
      setVisibleData((prev) => prev.filter((item) => item !== val));
    } else {
      setVisibleData((prev) => [...prev, val]);
    }
  };

  return {
    visibleData,
    colorMap,
    toggle,
  };
};
