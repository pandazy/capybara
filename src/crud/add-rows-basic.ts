import { BasicTable, Row } from '../types';
import { AddRowResult } from './types';

function addOneRow<TRow extends Row>(table: BasicTable<TRow>, newRow: TRow) {
  const lastNewId = table.lastNewId + 1;
  return {
    ...table,
    rows: { ...table.rows, [lastNewId]: newRow },
    lastNewId,
  };
}

export function addRowsBasic<TRow extends Row>(
  table: BasicTable<TRow>,
  newRows: TRow[],
): AddRowResult<TRow> {
  const initResult: AddRowResult<TRow> = {
    updatedTable: table,
    newRowKeys: [],
  };
  return newRows.reduce((result: AddRowResult<TRow>, newRow: TRow) => {
    const updatedTable = addOneRow<TRow>(result.updatedTable, newRow);
    return {
      newRowKeys: [
        ...result.newRowKeys,
        updatedTable.lastNewId.toString(),
      ],
      updatedTable,
    };
  }, initResult);
}
