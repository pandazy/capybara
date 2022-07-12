import { BasicTable } from '../types';
import { getTableIndexCreator } from './get-table-index-creator';
import { ns } from './ns';

interface TestRow {
  name: string;
  job: string;
  alias: string;
}

describe(ns('getTableIndexCreator'), () => {
  it('should create index for a given basic table', () => {
    expect.assertions(2);
    const fields1 = { fields: ['name', 'job'], isUnique: false };
    const fields2 = { fields: ['alias', 'job'], isUnique: false };
    const customHash = (val: string) => `%${val}%`;
    const table: BasicTable<TestRow> = {
      rows: {
        '1': { name: 'shinobu', job: 'Jobless', alias: 'kiss-shot' },
        '2': { name: 'tsubasa', job: 'Student', alias: 'sawarineko' },
      },
      lastNewId: 2,
    };

    const indexCreator = getTableIndexCreator<TestRow>([fields1, fields2]);
    const indexCreatorHashed = getTableIndexCreator<TestRow>(
      [fields1, fields2],
      customHash,
    );

    expect(indexCreator(table).index).toEqual({
      '[job:jobless][name:shinobu]': ['1'],
      '[alias:kiss-shot][job:jobless]': ['1'],
      '[job:student][name:tsubasa]': ['2'],
      '[alias:sawarineko][job:student]': ['2'],
    });
    expect(indexCreatorHashed(table).index).toEqual({
      '%[job:Jobless][name:shinobu]%': ['1'],
      '%[alias:kiss-shot][job:Jobless]%': ['1'],
      '%[job:Student][name:tsubasa]%': ['2'],
      '%[alias:sawarineko][job:Student]%': ['2'],
    });
  });
});
