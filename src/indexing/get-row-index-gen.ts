import { CommonMap, Row } from '../types';
import { makeAssertUniquePass } from './make-assert-unique-pass';
import { hashByDefault, getIndexKeyGen } from './get-index-key-gen';
import { ns } from './ns';
import { getUniqCheck, UniqCheck } from './get-uniq-check';
import { Index, IndexDef } from './types';
import { keys } from '@pandazy/mole-core/dist/object-methods';

const Context = ns('getRowIndexGen');

export function getRowIndexGen<TRow extends Row>(
	indexDefMap: CommonMap<IndexDef>,
	hash = hashByDefault,
) {
	const indexers = keys(indexDefMap).map((defKey) => {
		const indexDef = indexDefMap[defKey];
		return {
			makeKey: getIndexKeyGen<TRow>(indexDef.fields, hash),
			uniqCheck: getUniqCheck<TRow>(indexDef, hash),
			indexDef,
		};
	});
	const assertUnique = makeAssertUniquePass(Context);
	return (index: Index, row: TRow, rowKey: string) => {
		const newIndexFragment: Index = indexers.reduce(
			(indexFragment, { makeKey, uniqCheck, indexDef }) => {
				assertUnique({
					row,
					indexDef,
					index,
					pass: uniqCheck as UniqCheck<Row>,
				});
				const indexKey = makeKey(row);
				const existingRowKeys = index[indexKey] || [];
				return {
					...indexFragment,
					[indexKey]: [...existingRowKeys, rowKey],
				};
			},
			{},
		);
		return {
			...index,
			...newIndexFragment,
		};
	};
}
