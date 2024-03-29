import { BasicTable, CommonMap, Row } from '../types';

export function updateRowsBasic<TRow extends Row, TUpdate extends CommonMap>(
  table: BasicTable<TRow>,
  rowKeys: string[],
  update: TUpdate,
): BasicTable<TRow> {
  return {
    ...table,
    rows: rowKeys.reduce((updatedRows, rowKey) => {
      if (!rowKey || !updatedRows[rowKey]) {
        return updatedRows;
      }
      return {
        ...updatedRows,
        [rowKey]: {
          ...updatedRows[rowKey],
          ...update,
        },
      };
    }, table.rows),
  };
}
