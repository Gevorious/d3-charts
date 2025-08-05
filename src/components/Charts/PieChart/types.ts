type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type NumberKey<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export type PieChartProps<T> = {
  data: T[];
  keyField: StringKeys<T>;
  valueField: NumberKey<T>;
  width?: number;
  height?: number;
};
