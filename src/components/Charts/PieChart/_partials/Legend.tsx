import ListItem from './ListItem';
import { calculateIconSize } from '../_utils';
import { LegendProps } from '../types';

const Legend = <T,>({
  data,
  keyField,
  valueField,
  height,
  visibleItems,
  colorByKey,
  onToggleItem,
  onHover,
}: LegendProps<T>) => {
  return (
    <g transform={`translate(0, 20)`}>
      {data.map((item, i) => {
        const iconSize = calculateIconSize(height, data.length);
        const key = String(item[keyField]);

        return (
          <g
            key={key}
            transform={`translate(0, ${i * iconSize * 1.2})`}
            onMouseEnter={() => onHover(key)}
            onMouseLeave={() => onHover()}
          >
            <ListItem
              onClick={() => onToggleItem(key)}
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
  );
};

export default Legend;
