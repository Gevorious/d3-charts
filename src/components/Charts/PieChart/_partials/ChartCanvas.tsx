import { ChartCanvasProps } from '../types';

const ChartCanvas = ({ width, height, children }: ChartCanvasProps) => {
  return (
    <svg width={width} height={height}>
      {children}
    </svg>
  );
};

export default ChartCanvas;
