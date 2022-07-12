import { getUniqCheck } from './get-uniq-check';
import { ns } from './ns';

interface TestRow {
  name: string;
  job: string;
  alias: string;
}

describe(ns('getUniqCheck'), () => {
  it('should check if a unique-indexed index has a duplciate row trying to get indexed', () => {
    expect.assertions(2);

    const row: TestRow = {
      name: 'shinobu',
      job: 'Jobless',
      alias: 'kiss-shot',
    };
    const passRow: TestRow = {
      name: 'koyomi',
      job: 'Student',
      alias: 'araraki-kun',
    };
    const customHash = (val: string) => `%${val}%`;
    const fields1 = { fields: ['name', 'job'], isUnique: true };
    const index = {
      ['[job:jobless][name:shinobu]']: ['1'],
    };
    const indexWithHash = {
      '%[job:Jobless][name:shinobu]%': ['1'],
    };

    const passUniqCheck = getUniqCheck<TestRow>(fields1);
    const passUniqCheckWithHash = getUniqCheck<TestRow>(
      fields1,
      customHash,
    );
    expect(passUniqCheck(row, index)).toBe(false);
    expect(passUniqCheckWithHash(passRow, indexWithHash)).toBe(true);
  });
});
