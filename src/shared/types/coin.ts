import { TagList } from 'features/coins-table/ui/TagsSelector/TagsSelector';
import { Currencies } from '../constants/currency';
import { SortDirection } from '../constants/sort';

export type Coin = {
	uuid: string;
	name: string;
	symbol: string;
	rank: number;
	iconUrl: string;
	price: string;
	change: string; // (%)
	marketCap: string;
	'24hVolume': string;
	sparkline: string[];
}

export type CurrencyType = typeof Currencies[keyof typeof Currencies];

export type Kurs = {
	RUB: number;
	EUR: number
}

export type SortDirectionType = keyof typeof SortDirection;

export type FieldNameType = keyof Omit<Coin, 'iconUrl' | 'symbol' | 'uuid'>;

export type TagType = keyof typeof TagList;

export type NotationType = 'standard' | 'scientific' | 'engineering' | 'compact' | undefined;
