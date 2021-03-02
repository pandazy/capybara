import { BasicTable, CommonMap, Row } from '../types';

export type PrimaryIndex = { [key: string]: string };

export type SecondaryIndex = { [key: string]: string[] };

export type Index = {
	[key: string]: string[];
};

export type IndexDef = { fields: string[]; isUnique: boolean };

export interface Indexed {
	index: Index;
	indexDefs: CommonMap<IndexDef>;
}

export interface IndexedTable<TRow extends Row>
	extends BasicTable<TRow>,
		Indexed {}

export interface PrimaryIndexed {
	primaryIndex: PrimaryIndex;
	primaryIndexFields: string[];
}

export interface PrimaryIndexedTable<TRow extends Row>
	extends BasicTable<TRow>,
		PrimaryIndexed {}

export interface SecondaryIndexed {
	secondaryIndices: SecondaryIndex;
	secondaryIndexFields: string[][];
}

export interface FullyIndexed extends PrimaryIndexed, SecondaryIndexed {}

export interface SecondaryIndexedTable<TRow extends Row>
	extends BasicTable<TRow>,
		SecondaryIndexed {}

export interface FullyIndexedTable<TRow extends Row>
	extends BasicTable<TRow>,
		PrimaryIndexed,
		SecondaryIndexed {}
