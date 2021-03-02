import { BasicTable, Row } from '../types';

export interface QueryParam {
	[key: string]: any;
}

export interface AddRowResult<
	TRow extends Row,
	TTable extends BasicTable<TRow> = BasicTable<TRow>
> {
	newRowKeys: string[];
	updatedTable: TTable;
}
