import { getIndexKeyGen, makeIndexDefKey } from './get-index-key-gen';
import { ns } from './ns';

interface TestRow {
  name: string;
  job: string;
  alias: string;
}

describe(ns('getIndexKeyGen'), () => {
  it('should generate an index key', () => {
    expect.assertions(3);

    const row: TestRow = {
      name: 'shinobu',
      job: 'Jobless',
      alias: 'kiss-shot',
    };
    const emptyRow: TestRow = {
      name: '',
      job: '',
      alias: '',
    };
    const indexFields = ['name', 'job', 'alias'];
    const makeKeyOfRow = getIndexKeyGen<TestRow>(indexFields);
    const hasher = (content: any) => `&${content}&`;
    const makeIndexKeyFromHasher = getIndexKeyGen(indexFields, hasher);

    expect(makeKeyOfRow(row)).toBe(
      '[alias:kiss-shot][job:jobless][name:shinobu]',
    );
    expect(makeKeyOfRow(emptyRow)).toBe('');

    expect(makeIndexKeyFromHasher(row)).toBe(
      '&[alias:kiss-shot][job:Jobless][name:shinobu]&',
    );
  });

  it('should generate an index definition key', () => {
    expect.assertions(1);

    expect(makeIndexDefKey(['name', 'job'])).toBe('job|name');
  });
});
