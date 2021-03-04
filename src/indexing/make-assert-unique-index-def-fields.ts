import { assertValue } from '@pandazy/mole-core/dist/assertions';
import { CommonMap } from '../types';
import { makeIndexDefKey } from './get-index-key-gen';
import { IndexDef } from './types';

export interface ThingsToCheck {
	fields: string[];
	indexDefs: CommonMap<IndexDef>;
}

const isValid = ({ fields, indexDefs }: ThingsToCheck) => {
	const indexDefKey = makeIndexDefKey(fields);
	return !indexDefs.hasOwnProperty(indexDefKey);
};

export const makeAssertUniqueIndexDefFields = assertValue<ThingsToCheck>({
	isValid,
	failureCause: 'the same fields already got defined',
});
