import { PieChartProps } from './types';
import { usePieChart } from './_hooks/usePieChart';
import { ChartCanvas, PieSlices, Legend } from './_partials';
import './styles.scss';

const PieChart = <T,>(props: PieChartProps<T>) => {
  const {
    radius,
    arcEl,
    colorByKey,
    arcs,
    total,
    hoveredKey,
    onHover,
    onToggleItem,
    visibleItems,
  } = usePieChart(props);

  const { width = 1100, height = 600, data, keyField, valueField } = props;

  return (
    <ChartCanvas width={width} height={height}>
      <PieSlices
        arcs={arcs}
        arcEl={arcEl}
        keyField={keyField}
        colorByKey={colorByKey}
        total={total}
        radius={radius}
        hoveredKey={hoveredKey}
        onHover={onHover}
      />
      <g transform={`translate(${width - 250}, 0)`}>
        <Legend
          data={data}
          keyField={keyField}
          valueField={valueField}
          height={height}
          visibleItems={visibleItems}
          colorByKey={colorByKey}
          onToggleItem={onToggleItem}
          onHover={onHover}
        />
      </g>
    </ChartCanvas>
  );
};

export default PieChart;
