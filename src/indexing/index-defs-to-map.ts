import { CommonMap } from '../types';
import { makeIndexDefKey } from './get-index-key-gen';
import { makeAssertUniqueIndexDefFields } from './make-assert-unique-index-def-fields';
import { ns } from './ns';
import { IndexDef } from './types';

const Context = ns('indexDefsToMap');

const assertUniqueIndexDefFields = makeAssertUniqueIndexDefFields(Context);

export function indexDefsToMap(fieldDefs: IndexDef[]): CommonMap<IndexDef> {
	return fieldDefs.reduce((defMap, { fields, isUnique }: IndexDef) => {
		assertUniqueIndexDefFields(fields, defMap);
		const defKey = makeIndexDefKey(fields);
		return {
			...defMap,
			[defKey]: {
				fields,
				isUnique,
			},
		};
	}, {});
}
