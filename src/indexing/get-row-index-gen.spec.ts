import { getRowIndexGen } from './get-row-index-gen';
import { ns } from './ns';

interface TestRow {
  name: string;
  job: string;
  species: string;
}

describe(ns('getRowIndexGen'), () => {
  it('should update index for a given row', () => {
    expect.assertions(2);

    const row: TestRow = {
      name: 'shinobu',
      job: 'Jobless',
      species: 'Vampire',
    };
    const fields1 = { fields: ['name', 'job'], isUnique: true };
    const fields2 = { fields: ['species', 'job'], isUnique: false };
    const indexDefs = {
      'job|name': fields1,
      'job|species': fields2,
    };
    const customHash = (val: string) => `%${val}%`;
    const index = {
      ['[job:knowall][name:tsubasa]']: ['3'],
      ['[job:jobless][species:vampire]']: ['2'],
    };
    const indexWithHash = {
      '%[job:knowall][name:tsubasa]%': ['3'],
      '%[job:Jobless][species:Vampire]%': ['2'],
    };

    const addIndex = getRowIndexGen<TestRow>(indexDefs);
    const addIndexWithHash = getRowIndexGen<TestRow>(indexDefs, customHash);

    expect(addIndex(index, row, '1')).toEqual({
      ['[job:knowall][name:tsubasa]']: ['3'],
      ['[job:jobless][name:shinobu]']: ['1'],
      ['[job:jobless][species:vampire]']: ['2', '1'],
    });
    expect(addIndexWithHash(indexWithHash, row, '1')).toEqual({
      '%[job:knowall][name:tsubasa]%': ['3'],
      '%[job:Jobless][name:shinobu]%': ['1'],
      '%[job:Jobless][species:Vampire]%': ['2', '1'],
    });
  });

  it('should throw an error when insert duplicate row into unique-indexed row', () => {
    expect.assertions(2);

    const row: TestRow = {
      name: 'shinobu',
      job: 'Jobless',
      species: 'Vampire',
    };

    const customHash = (val: string) => `%${val}%`;
    const index = {
      ['[job:jobless][name:shinobu]']: ['1'],
    };
    const indexWithHash = {
      '%[job:Jobless][name:shinobu]%': ['1'],
    };

    const fields1 = { fields: ['name', 'job'], isUnique: true };
    const indexDefs = {
      'job|name': fields1,
    };
    const addIndex = getRowIndexGen<TestRow>(indexDefs);
    const addIndexWithHash = getRowIndexGen<TestRow>(indexDefs, customHash);

    expect(() => addIndex(index, row, '1')).toThrowErrorMatchingSnapshot();
    expect(() =>
      addIndexWithHash(indexWithHash, row, '1'),
    ).toThrowErrorMatchingSnapshot();
  });
});
