import { LeftAxisProps } from '../types';

const LeftAxis = ({ yScale, height, width }: LeftAxisProps) => {
  const yTicks = yScale.ticks(10);
  return (
    <>
      <line x1={0} y1={0} x2={0} y2={height} stroke="#999" />
      {yTicks.map((d, i) => (
        <g key={i} transform={`translate(0,${yScale(d)})`}>
          <line x1={-6} x2={width} className="tick" />
          <text x={-10} y={4} textAnchor="end" fontSize={10} fill="#333">
            {d.toFixed(2)}
          </text>
        </g>
      ))}
    </>
  );
};

export default LeftAxis;
