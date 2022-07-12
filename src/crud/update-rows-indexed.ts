import { hashByDefault } from '../indexing/get-index-key-gen';
import { getRowIndexGen } from '../indexing/get-row-index-gen';
import { getRowIndexRemover } from '../indexing/get-row-index-remover';
import { IndexedTable } from '../indexing/types';
import { CommonMap, Row } from '../types';
import { updateRowsBasic } from './update-rows-basic';

export function updateRowsIndexed<TRow extends Row, TUpdate extends CommonMap>(
  table: IndexedTable<TRow>,
  rowKeys: string[],
  update: TUpdate,
  hash = hashByDefault,
): IndexedTable<TRow> {
  const newTableData = updateRowsBasic<TRow, TUpdate>(table, rowKeys, update);
  const removeIndex = getRowIndexRemover<TRow>(table.indexDefs, hash);
  const addIndex = getRowIndexGen<TRow>(table.indexDefs, hash);
  const index = rowKeys.reduce((updatedIndex, rowKey) => {
    const oldRow = table.rows[rowKey];
    const newRow = newTableData.rows[rowKey];
    if (!oldRow || !newRow) {
      return updatedIndex;
    }
    const removedIndex = removeIndex(updatedIndex, oldRow, rowKey);
    return addIndex(removedIndex, newRow, rowKey);
  }, table.index);

  return {
    ...newTableData,
    index,
    indexDefs: table.indexDefs,
  };
}
