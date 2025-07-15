import type { MarkProps } from '../types';

const Marks = ({ x, y, width, height, tooltip, show }: MarkProps) => {
  return (
    <rect
      className="bar"
      x={x}
      y={y}
      width={width}
      height={height}
      opacity={show ? 1 : 0}
    >
      {show && <title>{tooltip}</title>}
    </rect>
  );
};

export default Marks;
