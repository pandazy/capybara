import { Row } from '../types';

function squeezeSpaces(input: string): string {
  if (!input) {
    return '';
  }
  return input.toString().replace(/\s+/gi, ' ').trim();
}

export function hashByDefault(val: string): string {
  return val.toLowerCase();
}

export function getIndexKeyGen<TRow extends Row>(
  fields: string[],
  fieldHasher = hashByDefault,
) {
  return (row: TRow) => {
    const dataRow = row as any;
    const allValues = fields
      .sort()
      .reduce((accKey: string, field: string) => {
        const val = dataRow[field];
        const newPart = val ? `[${field}:${val}]` : '';
        return `${accKey}${newPart}`;
      }, '')
      .trim();
    const process = (val: string) => fieldHasher(squeezeSpaces(val));
    return process(allValues);
  };
}

export function makeIndexDefKey(fields: string[]) {
  return fields.sort().join('|');
}
