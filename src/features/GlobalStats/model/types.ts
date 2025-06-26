export type GlobalStatsCoin = {
	uuid: string;
	name: string; 
	symbol: string; 
	iconUrl: string;
}

export type GlobalStats = {
	totalCoins: number,
    totalMarkets: number,
    totalExchanges: number,
    totalMarketCap: string,
    total24hVolume: string,
    btcDominance: number,
    bestCoins: GlobalStatsCoin[],
    newestCoins: GlobalStatsCoin[],
}