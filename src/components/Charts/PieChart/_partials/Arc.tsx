import { ArcProps } from '../types';

const Arc = <T,>({ arc, arcDatum, color, title }: ArcProps<T>) => {
  return (
    <path d={arc(arcDatum) || ''} fill={color} stroke="#fff" strokeWidth={1}>
      <title>{title}</title>
    </path>
  );
};

export default Arc;
