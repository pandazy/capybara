import { keys } from '@pandazy/mole-core/dist/object-methods';
import { BasicTable, Row } from '../types';
import { hashByDefault } from './get-index-key-gen';
import { getRowIndexGen } from './get-row-index-gen';
import { indexDefsToMap } from './index-defs-to-map';
import { Index, IndexDef, IndexedTable } from './types';

export function getTableIndexCreator<TRow extends Row>(
  fieldDefs: IndexDef[],
  hash = hashByDefault,
) {
  const indexDefs = indexDefsToMap(fieldDefs);
  const updateIndex = getRowIndexGen<TRow>(indexDefs, hash);
  return (table: BasicTable<TRow>): IndexedTable<TRow> => {
    const index: Index = keys(table.rows).reduce(
      (updatedIndex: Index, rowKey: string) => {
        return updateIndex(updatedIndex, table.rows[rowKey], rowKey);
      },
      {},
    );
    return {
      ...table,
      index,
      indexDefs,
    };
  };
}
