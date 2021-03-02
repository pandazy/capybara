import { addRowsIndexed } from './add-rows-indexed';
import { getIndexedQuery } from './get-indexed-query';
import { indexedTable } from './new-table';
import { ns } from './ns';

interface TestRow {
	name: string;
	firstName: string;
	lastName: string;
}

describe(ns('getIndexedQuery'), () => {
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

	it('should return indexed records when queried', () => {
		expect.assertions(3);

		const table = indexedTable<TestRow>([
			{
				fields: ['firstName', 'lastName'],
				isUnique: false,
			},
		]);
		const hash = (val: string) => `%${val}%`;
		const { updatedTable } = addRowsIndexed<TestRow>(table, [row1, row2]);
		const { updatedTable: updatedTableHashed } = addRowsIndexed<TestRow>(
			table,
			[row1, row2],
			hash,
		);
		const query = getIndexedQuery<TestRow>(updatedTable);
		const queryHashed = getIndexedQuery<TestRow>(updatedTableHashed, hash);

		expect(query({ firstName: 'shinobu', lastName: 'oshino' })).toEqual([
			row1,
		]);
		expect(
			query({ firstName: 'Shinobu', lastName: 'Oshino' }, true),
		).toEqual(['1']);

		expect(
			queryHashed({ firstName: 'Mayoi', lastName: 'Hachikuji' }),
		).toEqual([row2]);
	});
});
