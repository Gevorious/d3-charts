import { drag, scaleLinear, select, ticks } from 'd3';
import React, { useEffect, useRef } from 'react';
import { YearSliderProps } from './types';
import './styles.scss';

const margin = { left: 40, right: 40 };

const YearSlider = ({
  width,
  height,
  yearRange,
  onChange,
  year,
}: YearSliderProps) => {
  const groupRef = useRef<SVGGElement>(null);

  const xScale = scaleLinear()
    .domain(yearRange)
    .range([margin.left, width - margin.right])
    .clamp(true);

  useEffect(() => {
    if (!groupRef.current) return;

    const group = select(groupRef.current);
    const handle = group.select<SVGCircleElement>('circle.handle');
    const label = group.select<SVGTextElement>('text.label');

    const dragBehavior = drag<SVGCircleElement, unknown>().on(
      'start drag',
      (event) => {
        const newX = xScale(Math.round(xScale.invert(event.x)));
        const newYear = Math.round(xScale.invert(newX));

        onChange(newYear);

        handle.attr('cx', newX);
        label.attr('x', newX).text(newYear);
      },
    );

    handle.call(dragBehavior);
  }, [xScale, onChange]);

  const cx = xScale(year);

  return (
    <g ref={groupRef} className="slider">
      <line
        className="axis"
        x1={margin.left}
        x2={width - margin.right}
        y1={height}
        y2={height}
      />

      {ticks(...yearRange, 10).map((tick) => {
        const x = xScale(tick);
        return (
          <g key={tick} className="tick">
            <line x1={x} x2={x} y1={height - 9} y2={height + 9} />
            <text x={x} y={height + 20}>
              {tick}
            </text>
          </g>
        );
      })}

      <text className="label" x={cx} y={height - 15}>
        {year}
      </text>

      <circle className="handle" cx={cx} cy={height} r={8} />
    </g>
  );
};

export default React.memo(YearSlider);
