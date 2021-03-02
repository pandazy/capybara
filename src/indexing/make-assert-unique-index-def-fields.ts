import { assertValue } from '@pandazy/mole/assertions';
import { CommonMap } from '../types';
import { makeIndexDefKey } from './get-index-key-gen';
import { IndexDef } from './types';

const isValid = ({
	fields,
	indexDefs,
}: {
	fields: string[];
	indexDefs: CommonMap<IndexDef>;
}) => {
	const indexDefKey = makeIndexDefKey(fields);
	return !indexDefs.hasOwnProperty(indexDefKey);
};

const assertUniqueIndexDefFields = assertValue({
	isValid,
	failureCause: 'the same fields already got defined',
});

export function makeAssertUniqueIndexDefFields(context: string) {
	const assertInContext = assertUniqueIndexDefFields(context);
	return (fields: string[], indexDefs: CommonMap<IndexDef>) => {
		assertInContext({
			fields,
			indexDefs,
		});
	};
}
