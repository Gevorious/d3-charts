import { LineToggleProps } from '../types';

const LineToggle = ({
  label,
  color,
  checked,
  onChange,
  transform,
}: LineToggleProps) => {
  return (
    <g
      onClick={onChange}
      className={`line-toggle__icon ${checked ? 'checked' : ''}`}
      transform={transform}
    >
      <rect x="0" y="0" width="70" height="20" fill="transparent" />
      <text x="48" y="9" className="line-toggle__label">
        {label}
      </text>
      <line
        x1="2"
        y1="6"
        x2="40"
        y2="6"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
};

export default LineToggle;
