import { addRowsIndexed } from './add-rows-indexed';
import { basicTable, indexedTable } from './new-table';
import { ns } from './ns';

interface TestRow {
	name: string;
	firstName: string;
	lastName: string;
}

describe(ns('addRowsIndexed'), () => {
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

	it('should create a basic table', () => {
		expect.assertions(2);
		const table = basicTable<TestRow>();

		expect(table.rows).toEqual({});
		expect(table.nextNewId).toBe(0);
	});

	it('should add rows to an indexed table', () => {
		expect.assertions(3);

		const table = indexedTable<TestRow>([
			{ fields: ['firstName', 'lastName'], isUnique: true },
		]);

		const { newRowKeys, updatedTable } = addRowsIndexed<TestRow>(table, [
			row1,
			row2,
		]);

		expect(newRowKeys).toEqual(['1', '2']);
		expect(updatedTable.rows).toEqual({ '1': row1, '2': row2 });
		expect(updatedTable.index).toEqual({
			'[firstname:shinobu][lastname:oshino]': ['1'],
			'[firstname:mayoi][lastname:hachikuji]': ['2'],
		});
	});

	it('should add rows to an indexed table with customed hash and initial new id', () => {
		const customHash = (val: string) => `%${val}%`;
		const table = indexedTable<TestRow>(
			[{ fields: ['firstName', 'lastName'], isUnique: true }],
			10,
		);
		const { newRowKeys, updatedTable } = addRowsIndexed<TestRow>(
			table,
			[row1, row2],
			customHash,
		);

		expect(newRowKeys).toEqual(['11', '12']);
		expect(updatedTable.rows).toEqual({ '11': row1, '12': row2 });
		expect(updatedTable.index).toEqual({
			'%[firstName:Shinobu][lastName:Oshino]%': ['11'],
			'%[firstName:Mayoi][lastName:Hachikuji]%': ['12'],
		});
	});
});
