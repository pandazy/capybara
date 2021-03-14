import { updateRowsIndexed } from './update-rows-indexed';
import { indexedTable } from './new-table';
import { ns } from './ns';
import { addRowsIndexed } from './add-rows-indexed';

interface TestRow {
	name: string;
	firstName: string;
	lastName: string;
}

interface TestUpdate {
	firstName: string;
	lastName: string;
}

describe(ns('updateRowsIndexed'), () => {
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

	const table = indexedTable<TestRow>([
		{ fields: ['firstName', 'lastName'], isUnique: false },
	]);

	const customHash = (val: string) => `%${val}%`;

	const mockTable = addRowsIndexed<TestRow>(table, [row1, row2]).updatedTable;
	const mockTableHashed = addRowsIndexed<TestRow>(
		table,
		[row1, row2],
		customHash,
	).updatedTable;

	it('should update rows in an indexed table', () => {
		expect.assertions(4);

		const updatedTable = updateRowsIndexed<TestRow, TestUpdate>(
			mockTable,
			['1', '2'],
			{ firstName: 'Foo', lastName: 'Bar' },
		);

		const updatedTableWrongKey = updateRowsIndexed<TestRow, TestUpdate>(
			mockTable,
			['6', undefined as any],
			{ firstName: 'Foo', lastName: 'Bar' },
		);

		const updatedTableHashed = updateRowsIndexed<TestRow, TestUpdate>(
			mockTableHashed,
			['1', '2', '3'],
			{ firstName: 'Foo', lastName: 'Bar' },
			customHash,
		);

		expect(updatedTableWrongKey).toEqual(mockTable);

		expect(updatedTable.rows).toEqual({
			'1': {
				name: 'kiss-shot',
				firstName: 'Foo',
				lastName: 'Bar',
			},
			'2': {
				name: 'mayoi-snail',
				firstName: 'Foo',
				lastName: 'Bar',
			},
		});

		expect(updatedTable.index).toEqual({
			'[firstname:foo][lastname:bar]': ['1', '2'],
		});

		expect(updatedTableHashed.index).toEqual({
			'%[firstName:Foo][lastName:Bar]%': ['1', '2'],
		});
	});
});
