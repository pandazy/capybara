import { getRowIndexGen } from '../indexing/get-row-index-gen';
import { hashByDefault } from '../indexing/get-index-key-gen';
import { IndexedTable } from '../indexing/types';
import { Row } from '../types';
import { addRowsBasic } from './add-rows-basic';
import { AddRowResult } from './types';

export function addRowsIndexed<TRow extends Row>(
  table: IndexedTable<TRow>,
  newRows: TRow[],
  hash = hashByDefault,
): AddRowResult<TRow, IndexedTable<TRow>> {
  const initResult: AddRowResult<TRow, IndexedTable<TRow>> = {
    newRowKeys: [],
    updatedTable: table,
  };
  const addRowIndex = getRowIndexGen<TRow>(table.indexDefs, hash);
  return newRows.reduce(
    (finalResult: AddRowResult<TRow, IndexedTable<TRow>>, newRow: TRow) => {
      const oneRowDataResult = addRowsBasic<TRow>(
        finalResult.updatedTable,
        [newRow],
      );
      const { updatedTable: updatedTableData } = oneRowDataResult;
      const newRowKey = updatedTableData.lastNewId.toString();
      const index = addRowIndex(
        finalResult.updatedTable.index,
        newRow,
        newRowKey,
      );
      return {
        newRowKeys: [...finalResult.newRowKeys, newRowKey],
        updatedTable: {
          ...updatedTableData,
          index,
          indexDefs: finalResult.updatedTable.indexDefs,
        },
      };
    },
    initResult,
  );
}
