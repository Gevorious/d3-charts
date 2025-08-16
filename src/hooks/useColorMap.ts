import { schemeTableau10 } from 'd3';
import { useMemo } from 'react';

export const useColorMap = (
  data: Record<string, unknown[]>,
  customColors?: Record<string, string>,
) => {
  return useMemo(() => {
    return Object.keys(data).reduce((acc, key, i) => {
      acc[key] =
        customColors && customColors[key]
          ? customColors[key]
          : schemeTableau10[i % schemeTableau10.length];
      return acc;
    }, {} as Record<string, string>);
  }, [data, customColors]);
};
