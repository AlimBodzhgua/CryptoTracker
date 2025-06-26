import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'app/store/config/AppState';

export const selectGlobalStats = (state: AppState) => state.globalStats.data;
export const selectGlobalStatsIsLoading = (state: AppState) => state.globalStats.isLoading;
export const selectGlobalStatsError = (state: AppState) => state.globalStats.error;

export const selectCoinsGlobalStatsData = createSelector(
	selectGlobalStats,
	(data) => {
		const globalDataList = [
			{
				title: 'Btc Dominance',
				value: data?.btcDominance,
			},
			{
				title: 'Total 24hVolume',
				value: data?.total24hVolume,
			},
			{
				title: 'Total MarketCap',
				value: data?.totalMarketCap,
			},
			{
				title: 'Total Exchanges',
				value: data?.totalExchanges,
			},
			{
				title: 'Total Markets',
				value: data?.totalMarkets,
			},
			{
				title: 'Total Coins',
				value: data?.totalCoins,
			},
		];
		return globalDataList;
	},
);
