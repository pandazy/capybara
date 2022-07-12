import { BasicTable, CommonMap, Row } from '../types';

export type Index = {
  [key: string]: string[];
};

export type IndexDef = { fields: string[]; isUnique: boolean };

export interface Indexed {
  index: Index;
  indexDefs: CommonMap<IndexDef>;
}

export interface IndexedTable<TRow extends Row>
  extends BasicTable<TRow>,
  Indexed {}
