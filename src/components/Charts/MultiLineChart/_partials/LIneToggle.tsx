import { LineToggleProps } from '../types';

const LineToggle = ({ label, color, checked, onChange }: LineToggleProps) => {
  return (
    <g onClick={onChange}>
      <text x="45" y="9" fontSize="14" fill="#333">
        {label}
      </text>
      <rect x="0" y="4" width="40" height="4" fill="#eee" rx="2" />
      <line
        x1="2"
        y1="6"
        x2="38"
        y2="6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
};

export default LineToggle;
