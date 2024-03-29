import { ICoin } from './coin';

export type ConverterCoinType = Pick<ICoin, 'name' | 'symbol' | 'iconUrl'>;

export interface IConverter {
	converterCoins: ConverterCoinType[];
	coinFrom: ConverterCoinType;
	coinTo: ConverterCoinType;
	convertResult: number;
}

export type ConverterListType = 'to' | 'from';
