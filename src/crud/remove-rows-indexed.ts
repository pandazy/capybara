import { hashByDefault } from '../indexing/get-index-key-gen';
import { getRowIndexRemover } from '../indexing/get-row-index-remover';
import { Index, IndexedTable } from '../indexing/types';
import { Row } from '../types';
import { removeRowsBasic } from './remove-rows-basic';

export function removeRowsIndexed<TRow extends Row>(
  table: IndexedTable<TRow>,
  rowKeys: string[],
  hash = hashByDefault,
): IndexedTable<TRow> {
  const updatedTable = removeRowsBasic<TRow>(table, rowKeys);
  const removeIndex = getRowIndexRemover<TRow>(table.indexDefs, hash);
  const index = rowKeys.reduce((finalIndex: Index, rowKey: string) => {
    return removeIndex(finalIndex, table.rows[rowKey], rowKey);
  }, table.index);
  return {
    ...updatedTable,
    index,
    indexDefs: table.indexDefs,
  };
}
