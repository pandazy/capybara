import { indexDefsToMap } from '../indexing/index-defs-to-map';
import { IndexDef, IndexedTable } from '../indexing/types';
import { BasicTable, Row } from '../types';

export function basicTable<TRow extends Row>(lastNewId = 0): BasicTable<TRow> {
  return {
    rows: {},
    lastNewId,
  };
}

export function indexedTable<TRow extends Row>(
  indexDefs: IndexDef[],
  lastNewId = 0,
): IndexedTable<TRow> {
  const tableData = basicTable<TRow>(lastNewId);
  return {
    ...tableData,
    index: {},
    indexDefs: indexDefsToMap(indexDefs),
  };
}
