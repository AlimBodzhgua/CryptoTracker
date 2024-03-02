export interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	iconUrl: string;
	price: string;
	change: string; // 24h change(%)
	marketCap: string;
	'24hVolume': string;
}
