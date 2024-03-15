export interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	iconUrl: string;
	price: string;
	change: string; // (%)
	marketCap: string;
	'24hVolume': string;
}

export type SortDirectionType = 'descending' | 'ascending';

export type FieldNameType = keyof Omit<ICoin, 'iconUrl' | 'symbol' | 'id'>;
