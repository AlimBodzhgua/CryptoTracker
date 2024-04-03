import { ICoin } from './coin';

export type ConverterCoinType = Pick<ICoin, 'name' | 'symbol' | 'iconUrl'>;

export interface IConverter {
	converterCoins: ConverterCoinType[];
	coinFrom: ConverterCoinType;
	coinTo: ConverterCoinType;
	convertResult: number;
}

export type ConverterListType = 'to' | 'from';

export interface IHistory {
	coinFrom: ConverterCoinType;
	coinTo: ConverterCoinType;
	amount: number;
	result: number;
}

export type HistoryType = Omit<IConverter, 'converterCoins'> & {
	amount: number;
	id?: string;
};
