import { format } from 'd3';

const gap = 8;

type ListItemProps = {
  name: string;
  value: number;
  color: string;
  iconSize?: number;
  onClick: () => void;
  checked: boolean;
};

const ListItem = ({
  name,
  value,
  color,
  iconSize = 20,
  onClick,
  checked,
}: ListItemProps) => {
  return (
    <g onClick={onClick} className={`toggle ${checked ? 'checked' : ''}`}>
      <rect x="0" y="0" width="90" height="20" fill="transparent" />
      <rect width={iconSize} height={iconSize} fill={color} />
      <text
        x={iconSize + gap}
        y={iconSize / 2}
        dominantBaseline="middle"
        fill="#333"
        fontSize={12}
      >
        {`${name}: ${format('.2s')(value).replace('G', 'B')}`}
      </text>
    </g>
  );
};

export default ListItem;
