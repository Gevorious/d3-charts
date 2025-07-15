import type { BottomAxisProps } from '../types';

const BottomAxis = ({ height, xScale, selected }: BottomAxisProps) => {
  const ticks = xScale.domain();

  return (
    <g className="axis" transform={`translate(0, ${height})`}>
      <line x1={xScale.range()[0]} x2={xScale.range()[1]} y1={0} y2={0} />
      {ticks.map((tickValue) => {
        const x = xScale(tickValue);
        if (x === undefined) return null;

        return (
          <g
            key={tickValue}
            transform={`translate(${x + xScale.bandwidth() / 2}, 0)`}
          >
            {selected.includes(tickValue) ? (
              <>
                <line y2="6" className="tick" />
                <text y="9" dy=".71em" textAnchor="middle" fontSize={12}>
                  {tickValue}
                </text>
              </>
            ) : null}
          </g>
        );
      })}
    </g>
  );
};

export default BottomAxis;
