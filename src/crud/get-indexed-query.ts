import { keys } from '@pandazy/mole-core/dist/object-methods';
import { getIndexKeyGen, hashByDefault } from '../indexing/get-index-key-gen';
import { IndexedTable } from '../indexing/types';
import { Row } from '../types';
import { QueryParam } from './types';

export function getIndexedQuery<TRow extends Row>(
  sourceTable: IndexedTable<TRow>,
  hash = hashByDefault,
) {
  return (query: QueryParam, isRowKeyOnly = false) => {
    const fields = keys(query);
    const indexKey = getIndexKeyGen<QueryParam>(fields, hash)(query);

    const rowKeys = sourceTable.index[indexKey];
    return isRowKeyOnly
      ? rowKeys
      : rowKeys.map((rowKey) => sourceTable.rows[rowKey]);
  };
}
