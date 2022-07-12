import { BasicTable, Row } from '../types';

export function removeRowsBasic<TRow extends Row>(
  table: BasicTable<TRow>,
  rowKeys: string[],
): BasicTable<TRow> {
  const rows = { ...table.rows };
  rowKeys.forEach((rowKey) => {
    if (rowKey) {
      delete rows[rowKey];
    }
  });
  return {
    rows,
    lastNewId: table.lastNewId,
  };
}
