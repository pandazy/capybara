export interface Row {
  [key: string]: any;
}

export interface BasicTable<RowT extends Row> {
  rows: { [key: string]: RowT };
  lastNewId: number;
}

export interface CommonMap<T = any> {
  [key: string]: T;
}
