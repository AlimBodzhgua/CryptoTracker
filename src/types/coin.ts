export interface ICoin {
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

export type GlobalStatsCoin = Pick<ICoin, 'uuid' | 'name' | 'symbol' | 'iconUrl'>

export interface IGlobalStats {
	totalCoins: number,
    totalMarkets: number,
    totalExchanges: number,
    totalMarketCap: string,
    total24hVolume: string,
    btcDominance: number,
    bestCoins: Array<GlobalStatsCoin>,
    newestCoins: Array<GlobalStatsCoin>,
}

export type SortDirectionType = 'descending' | 'ascending';

export type FieldNameType = keyof Omit<ICoin, 'iconUrl' | 'symbol' | 'uuid'>;
