import { indexDefsToMap } from '../indexing/index-defs-to-map';
import { IndexDef, IndexedTable } from '../indexing/types';
import { BasicTable, Row } from '../types';

export function basicTable<TRow extends Row>(nextNewId = 0): BasicTable<TRow> {
	return {
		rows: {},
		nextNewId,
	};
}

export function indexedTable<TRow extends Row>(
	indexDefs: IndexDef[],
	nextNewId = 0,
): IndexedTable<TRow> {
	const tableData = basicTable<TRow>(nextNewId);
	return {
		...tableData,
		index: {},
		indexDefs: indexDefsToMap(indexDefs),
	};
}
