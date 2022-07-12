import { hasOwnProps } from '@pandazy/mole-core';
import { Row } from '../types';
import { hashByDefault, getIndexKeyGen } from './get-index-key-gen';
import { Index, IndexDef } from './types';

export type UniqCheck<TRow extends Row> = (row: TRow, index: Index) => boolean;

export function getUniqCheck<TRow extends Row>(
  indexDef: IndexDef,
  indexHasher = hashByDefault,
): UniqCheck<TRow> {
  const makeIKey = getIndexKeyGen<TRow>(indexDef.fields, indexHasher);

  return (row: TRow, index: Index) => {
    const iKey = makeIKey(row);
    if (indexDef.isUnique) {
      return ! hasOwnProps([iKey])(index);
    }
    return true;
  };
}
