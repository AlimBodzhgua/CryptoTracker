
export type ConverterCoinType = {
	name: string;
	symbol: string;
	iconUrl: string;
}

export type Converter = {
	converterCoins: ConverterCoinType[];
	coinFrom: ConverterCoinType;
	coinTo: ConverterCoinType;
	convertResult: number;
}

export type ConverterListType = 'to' | 'from';

export type History = {
	coinFrom: ConverterCoinType;
	coinTo: ConverterCoinType;
	amount: number;
	result: number;
}

export type HistoryType = Omit<Converter, 'converterCoins'> & {
	amount: number;
	id?: string;
};
