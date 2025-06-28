import { Currencies } from '../constants/currency';

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
};

export type CurrencyType = typeof Currencies[keyof typeof Currencies];

export type Kurs = {
	RUB: number;
	EUR: number
}

export type NotationType = 'standard' | 'scientific' | 'engineering' | 'compact' | undefined;
