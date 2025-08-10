import Arc from './Arc';
import { calculatePercentage, calculateHoverOffset } from '../_utils';
import { PieSlicesProps } from '../types';

const PieSlices = <T,>({
  arcs,
  arcEl,
  keyField,
  colorByKey,
  total,
  radius,
  hoveredKey,
  onHover,
}: PieSlicesProps<T>) => {
  return (
    <g transform={`translate(${radius + 50}, ${radius * 2 - 250})`}>
      {arcs.map((arcDatum, i) => {
        const percentage = calculatePercentage(arcDatum.value, total);
        const key = String(arcDatum.data[keyField]);
        const { dx, dy } = calculateHoverOffset(
          arcDatum,
          arcEl,
          radius,
          hoveredKey,
          key,
        );

        return (
          <g
            key={key}
            transform={`translate(${dx}, ${dy})`}
            style={{ transition: 'transform 0.2s ease-out' }}
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
  );
};

export default PieSlices;
