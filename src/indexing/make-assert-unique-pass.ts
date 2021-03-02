import { assertValue } from '@pandazy/mole/assertions';
import { Row } from '../types';
import { UniqCheck } from './get-uniq-check';
import { Index, IndexDef } from './types';

const isValid = ({
	row,
	index,
	pass,
}: {
	row: Row;
	index: Index;
	pass: UniqCheck<Row>;
}) => pass(row, index);

const assertUniqueCheckPassed = assertValue({
	isValid,
	failureCause: 'duplicate row is not allowed',
});

export function makeAssertUniquePass<TRow extends Row>(context: string) {
	const assertInContext = assertUniqueCheckPassed(context);
	return (
		row: TRow,
		index: Index,
		pass: UniqCheck<TRow>,
		indexDef?: IndexDef,
	) =>
		assertInContext({
			indexDef,
			row,
			index,
			pass,
		});
}
