import { LinesProps } from '../types';

const Lines = ({ lines }: LinesProps) => {
  return lines.map(({ key, path, color }) => (
    <path key={key} d={path} stroke={color} strokeWidth={2} fill="none" />
  ));
};

export default Lines;
