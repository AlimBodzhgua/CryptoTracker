import { Coin } from 'shared/types/coin';

export type ConverterCoinType = {
	name: string;
	symbol: string;
	iconUrl: string;
}

export type WatchList = {
	ids: string[];
	coins: Coin[];
}

export type User = {
	id: string;
	email: string;
	password: string;
	login: string;
	imageUrl: string;
	isEmailVerified: boolean;
	conversionHistory?: HistoryType[];
	watchList: WatchList;
}

export type Converter = {
	converterCoins: ConverterCoinType[];
}

export type HistoryType = {
	coinFrom: ConverterCoinType;
	coinTo: ConverterCoinType;
	convertResult: number;
	amount: number;
	id?: string;
};
