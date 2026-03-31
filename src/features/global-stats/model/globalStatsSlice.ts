import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CurrencyType, Kurs } from 'shared/types/coin';
import { fetchGlobalStats } from './actions';
import { GlobalStats } from './types';

export interface GlobalStatsState {
	data?: GlobalStats;
	isLoading: boolean;
	error?: string;
}

const initialState: GlobalStatsState = {
	data: undefined,
	isLoading: false,
	error: undefined,
};

export const globalStatsSlice = createSlice({
	name: 'globalStats',
	initialState,
	selectors: {
		selectGlobalStats: (state) => state.data,
		selectGlobalStatsIsLoading: (state) => state.isLoading,
		selectGlobalStatsError: (state) => state.error,
		selectCoinsGlobalStatsData: createSelector(
			(state) => state.data,
			(data) => [
				{ title: 'market.btc_dominance', value: data?.btcDominance },
				{ title: 'market.total_24h_volume', value: data?.total24hVolume },
				{ title: 'market.total_market_cap', value: data?.totalMarketCap },
				{ title: 'market.total_exchanges', value: data?.totalExchanges },
				{ title: 'market.total_markets', value: data?.totalMarkets },
				{ title: 'market.total_coins', value: data?.totalCoins },
			],
		),
	},
	reducers: {
		changeCurrency: (
			state,
			action: PayloadAction<{
				kurs: Kurs;
				prevCurrency: CurrencyType;
				targetCurrency: CurrencyType | undefined;
			}>,
		) => {
			if (action.payload.prevCurrency === 'USD') {
				// USD -> RUB/EUR
				const currency = action.payload.targetCurrency === 'EUR' ? 'EUR' : 'RUB';
				const currencyPrice = action.payload.kurs[currency];

				if (state.data) {
					state.data.btcDominance *= currencyPrice;
					state.data.totalMarketCap = String(
						Number(state.data.totalMarketCap) * currencyPrice,
					);
					state.data.total24hVolume = String(
						Number(state.data.total24hVolume) * currencyPrice,
					);
				}
			} else if (
				(action.payload.prevCurrency === 'EUR' || action.payload.prevCurrency === 'RUB')
				&& (action.payload.targetCurrency === 'EUR' || action.payload.targetCurrency === 'RUB')
			) {
				// (RUB/EUR -> USD -> RUB/EUR)
				const currency = action.payload.prevCurrency;
				const currencyPrice = action.payload.kurs[currency];

				if (state.data) {
					state.data.btcDominance *= currencyPrice;
					state.data.totalMarketCap = String(
						Number(state.data.totalMarketCap) * currencyPrice,
					);
					state.data.total24hVolume = String(
						Number(state.data.total24hVolume) * currencyPrice,
					);
				}
			} else {
				// ('RUB/EUR -> USD')
				const currency = action.payload.prevCurrency;
				const currencyPrice = action.payload.kurs[currency];

				if (state.data) {
					state.data.btcDominance /= currencyPrice;
					state.data.totalMarketCap = String(
						Number(state.data.totalMarketCap) / currencyPrice,
					);
					state.data.total24hVolume = String(
						Number(state.data.total24hVolume) / currencyPrice,
					);
				}
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGlobalStats.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchGlobalStats.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchGlobalStats.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const { reducer: globalStatsReducer } = globalStatsSlice;
export const { actions: globalStatsActions } = globalStatsSlice;
export const { selectors: globalStatsSelectors } = globalStatsSlice;
