import { assertValue } from '@pandazy/mole/assertions';
import { Row } from '../types';

const isValid = ({ fields, row }: { fields: string[]; row: Row }) =>
	fields.every((field: string) => row.hasOwnProperty(field));

const assertValidField = assertValue({
	isValid,
	failureCause: 'some fields do not exist in the row',
});

export function makeAssertValidRowFields<TRow extends Row>(context: string) {
	const assertInContext = assertValidField(context);
	return (fields: string[], row: TRow) =>
		assertInContext({
			fields,
			row,
		});
}
