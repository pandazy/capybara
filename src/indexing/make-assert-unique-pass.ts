import { assertValue } from '@pandazy/mole-core/dist/assertions';
import { Row } from '../types';
import { UniqCheck } from './get-uniq-check';
import { Index, IndexDef } from './types';

export interface ThingsToCheck {
	row: Row;
	index: Index;
	pass: UniqCheck<Row>;
	indexDef?: IndexDef;
}

const isValid = ({ row, index, pass }: ThingsToCheck) => pass(row, index);

export const makeAssertUniquePass = assertValue<ThingsToCheck>({
	isValid,
	failureCause: 'duplicate row is not allowed',
});
