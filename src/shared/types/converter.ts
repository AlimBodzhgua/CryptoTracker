
export type ConverterCoinType = {
	name: string;
	symbol: string;
	iconUrl: string;
}
export type ConverterListType = 'to' | 'from';

export type ConversionResult = {
	coinFrom: ConverterCoinType,
	coinTo: ConverterCoinType,
	amount: number,
	result: number,
}