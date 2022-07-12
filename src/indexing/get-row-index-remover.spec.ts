import { getRowIndexRemover } from './get-row-index-remover';
import { ns } from './ns';

interface TestRow {
  name: string;
  job: string;
  alias: string;
}

describe(ns('getRowIndexRemover'), () => {
  it('should remove the index of a given row', () => {
    expect.assertions(3);

    const row: TestRow = {
      name: 'shinobu',
      job: 'Jobless',
      alias: 'kiss-shot',
    };
    const rowKey = '1';
    const fields1 = { fields: ['name', 'job'], isUnique: false };
    const fields2 = { fields: ['alias', 'job'], isUnique: false };
    const customHash = (val: string) => `%${val}%`;
    const index = {
      ['[job:jobless][name:shinobu]']: ['1'],
      ['[alias:kiss-shot][job:jobless]']: ['1', '2'],
    };
    const indexWithHash = {
      '%[job:Jobless][name:shinobu]%': ['1'],
      '%[alias:kiss-shot][job:Jobless]%': ['1', '2'],
    };
    const indexDefs = {
      'job|name': fields1,
      'alias|job': fields2,
    };
    const removeIndex = getRowIndexRemover<TestRow>(indexDefs);
    const removeIndexWithHash = getRowIndexRemover<TestRow>(
      indexDefs,
      customHash,
    );

    expect(removeIndex(index, row, rowKey)).toEqual({
      ['[alias:kiss-shot][job:jobless]']: ['2'],
    });
    expect(removeIndex(index, row, '3')).toEqual(index);
    expect(removeIndexWithHash(indexWithHash, row, rowKey)).toEqual({
      '%[alias:kiss-shot][job:Jobless]%': ['2'],
    });
  });

  it('should throw error if specified field does not exist on row', () => {
    expect.assertions(1);

    const row: TestRow = {
      name: 'shinobu',
      job: 'Jobless',
      alias: 'kiss-shot',
    };

    const fields1 = { fields: ['hobby', 'nationality'], isUnique: false };
    const index = {
      ['[job:jobless][name:shinobu]']: ['1'],
      ['[alias:kiss-shot][job:jobless]']: ['1', '2'],
    };

    const indexDefs = {
      'hobby|nationality': fields1,
    };
    const removeIndex = getRowIndexRemover<TestRow>(indexDefs);

    expect(() =>
      removeIndex(index, row, '3'),
    ).toThrowErrorMatchingSnapshot();
  });
});
