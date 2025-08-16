import type { AreaChartProps } from './types';
import {
  BottomAxis,
  LeftAxis,
  TimeLegend,
  ChartContainer,
  AreaPaths,
  ChartLegend,
} from './_partials';
import { useAreaChart, useScales } from './_hooks';
import './styles.scss';

const AreaChart = <T extends Record<string, any>>({
  data,
  config,
  timeLegends,
}: AreaChartProps<T>) => {
  const { width = 800, height = 600, margins, valueKeys, xKey } = config;
  const { range, handler, active } = timeLegends;

  const { visibleData, colorMap, toggle } = useAreaChart(data, {
    valueKeys,
    xKey,
  });
  const { xScale, yScale, sortedValues, innerWidth, innerHeight } = useScales({
    data,
    config,
    visibleData,
  });

  return (
    <ChartContainer width={width} height={height} margins={margins}>
      <AreaPaths
        data={data}
        sortedValues={sortedValues}
        xKey={xKey}
        xScale={xScale}
        yScale={yScale}
        colorMap={colorMap}
      />

      <ChartLegend
        colorMap={colorMap}
        visibleData={visibleData as string[]}
        onToggle={toggle}
        width={width}
        margins={margins}
      />

      <LeftAxis yScale={yScale} width={innerWidth} height={innerHeight} />
      <BottomAxis xScale={xScale} height={innerHeight} width={innerWidth} />

      <TimeLegend
        active={active}
        range={range}
        handler={handler}
        transform={`translate(0, ${height})`}
      />
    </ChartContainer>
  );
};

export default AreaChart;
