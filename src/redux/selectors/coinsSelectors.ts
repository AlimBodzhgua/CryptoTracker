import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../config/StateSchema';

export const selectCoins = (state: StateSchema) => state.coins.coins;

export const selectSearchedFilteredCoins = (state: StateSchema) => state.coins.searchedFilteredCoins;

export const selectCoinsIsLoading = (state: StateSchema) => state.coins.isLoading || false;

export const selectCoinsError = (state: StateSchema) => state.coins.error || '';

export const selectCoinsPageLimit = (state: StateSchema) => state.coins.limit;

export const selectCoinsPageNumber = (state: StateSchema) => state.coins.page;

export const selectCoinsPageHasMore = (state: StateSchema) => state.coins.hasMore;

export const selectCoinsGlobalStats = (state: StateSchema) => state.coins.globalStats;

export const selectCoinsGlobalStatsData = createSelector(
    selectCoinsGlobalStats,
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
