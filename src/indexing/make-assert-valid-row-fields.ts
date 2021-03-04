import { assertValue } from '@pandazy/mole-core/dist/assertions';
import { Row } from '../types';

export interface ThingsToCheck {
	fields: string[];
	row: Row;
}

const isValid = ({ fields, row }: ThingsToCheck) =>
	fields.every((field: string) => row.hasOwnProperty(field));

export const makeAssertValidRowFields = assertValue<ThingsToCheck>({
	isValid,
	failureCause: 'some fields do not exist in the row',
});
