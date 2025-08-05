import { Arc, PieArcDatum } from 'd3';

type ArcProps<T> = {
  arc: Arc<any, PieArcDatum<T>>;
  arcDatum: PieArcDatum<T>;
  color: string;
  title: string;
};

const Arc = <T,>({ arc, arcDatum, color, title }: ArcProps<T>) => {
  return (
    <path d={arc(arcDatum) || ''} fill={color} stroke="#fff" strokeWidth={1}>
      <title>{title}</title>
    </path>
  );
};

export default Arc;
