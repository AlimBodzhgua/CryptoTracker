import { ConverterCoinType, IConverter } from 'types/converter';

const initialCoinFrom: ConverterCoinType = {
	name: 'Bitcoin',
	iconUrl: 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg',
	symbol: 'BTC',
};

const initialCoinTo: ConverterCoinType = {
	name: 'Usd tether',
	iconUrl: 'https://cdn.coinranking.com/mgHqwlCLj/usdt.svg',
	symbol: 'USDT',
};

export const initialConverterData: IConverter = {
	converterCoins: [],
	coinFrom: initialCoinFrom,
	coinTo: initialCoinTo,
	convertResult: 0,
};
