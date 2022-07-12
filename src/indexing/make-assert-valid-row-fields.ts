import { hasOwnProps } from '@pandazy/mole-core';
import { assertValue } from '@pandazy/mole-core/dist/assertions';
import { Row } from '../types';

export interface ThingsToCheck {
  fields: string[];
  row: Row;
}

const isValid = ({ fields, row }: ThingsToCheck) =>
  fields.every((field: string) => hasOwnProps([field])(row));

export const makeAssertValidRowFields = assertValue<ThingsToCheck>({
  isValid,
  failureCause: 'some fields do not exist in the row',
});
