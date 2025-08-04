import { useMemo } from 'react';

export const useColorMap = (
  data: Record<string, unknown[]>,
  customColors: Record<string, string>,
  defaultColors: readonly string[],
) => {
  return useMemo(() => {
    return Object.keys(data).reduce((acc, key, i) => {
      acc[key] = customColors[key] || defaultColors[i % defaultColors.length];
      return acc;
    }, {} as Record<string, string>);
  }, [data, customColors, defaultColors]);
};
