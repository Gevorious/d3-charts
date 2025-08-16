import { area } from 'd3';
import { AreaPathsProps } from '../types';

const AreaPaths = <T extends Record<string, any>>({
  data,
  sortedValues,
  xKey,
  xScale,
  yScale,
  colorMap,
}: AreaPathsProps<T>) => {
  return (
    <>
      {sortedValues.map((key) => {
        const currentData = data.map((item) => ({
          x: item[xKey],
          y: item[key],
        }));

        const areaPath = area<{ x: any; y: number }>()
          .x((d) => xScale(d.x))
          .y0(yScale(0))
          .y1((d) => yScale(d.y));

        return (
          <path
            key={key as string}
            d={areaPath(currentData)!}
            fill={colorMap[key as string]}
          />
        );
      })}
    </>
  );
};

export default AreaPaths;
