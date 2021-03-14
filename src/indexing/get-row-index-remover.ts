import { keys } from '@pandazy/mole-core/dist/object-methods';
import { CommonMap, Row } from '../types';
import { getIndexKeyGen, hashByDefault } from './get-index-key-gen';
import { makeAssertValidRowFields } from './make-assert-valid-row-fields';
import { ns } from './ns';
import { Index, IndexDef } from './types';

const Context = ns('getRowIndexRemover');

const assertValidRowFields = makeAssertValidRowFields(Context);

export function getRowIndexRemover<TRow extends Row>(
	indexDefs: CommonMap<IndexDef>,
	hash = hashByDefault,
) {
	return (index: Index, row: TRow, rowKey: string) =>
		keys(indexDefs).reduce((updatedIndex: Index, defKey: string) => {
			if (!row) {
				return updatedIndex;
			}

			const { fields } = indexDefs[defKey];
			assertValidRowFields({ fields, row });

			const indexKey = getIndexKeyGen<TRow>(fields, hash)(row);
			const indexVals = updatedIndex[indexKey] || [];
			const recordIdToRemove = indexVals.findIndex(
				(indexedKey) => rowKey === indexedKey,
			);

			if (recordIdToRemove < 0) {
				return updatedIndex;
			}

			const newVals = [...indexVals];
			newVals.splice(recordIdToRemove, 1);
			index[indexKey] = newVals;
			if (newVals.length <= 0) {
				delete updatedIndex[indexKey];
			}
			return updatedIndex;
		}, index);
}
