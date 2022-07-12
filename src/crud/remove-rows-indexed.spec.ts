import { removeRowsIndexed } from './remove-rows-indexed';
import { indexedTable } from './new-table';
import { ns } from './ns';
import { addRowsIndexed } from './add-rows-indexed';

interface TestRow {
  name: string;
  firstName: string;
  lastName: string;
}

describe(ns('removeRowsIndexed'), () => {
  const row1: TestRow = {
    name: 'kiss-shot',
    firstName: 'Shinobu',
    lastName: 'Oshino',
  };

  const row2: TestRow = {
    name: 'mayoi-snail',
    firstName: 'Mayoi',
    lastName: 'Hachikuji',
  };

  it('should remove rows from an indexed table', () => {
    expect.assertions(5);
    const customHash = (val: string) => `%${val}%`;

    const table = indexedTable<TestRow>([
      { fields: ['firstName', 'lastName'], isUnique: true },
    ]);

    const { updatedTable: mockTable } = addRowsIndexed<TestRow>(table, [
      row1,
      row2,
    ]);
    const { updatedTable: mockTableHashed } = addRowsIndexed<TestRow>(
      table,
      [row1, row2],
      customHash,
    );

    const removedTable = removeRowsIndexed<TestRow>(mockTable, ['1', '2']);
    const removedTableWrongKey = removeRowsIndexed<TestRow>(mockTable, [
      '5',
      undefined as any,
    ]);
    const removedTableHashed = removeRowsIndexed<TestRow>(
      mockTableHashed,
      ['1', '2'],
      customHash,
    );
    expect(removedTable.rows).toEqual({});
    expect(removedTable.index).toEqual({});
    expect(removedTableWrongKey).toEqual(mockTable);

    expect(removedTableHashed.rows).toEqual({});
    expect(removedTableHashed.index).toEqual({});
  });
});
