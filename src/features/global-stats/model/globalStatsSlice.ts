import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGlobalStats } from './actions';
import { GlobalStats } from './types';
import type { CurrencyType, Kurs } from 'shared/types/coin';

export interface GlobalStatsState {
	data?: GlobalStats;
	isLoading: boolean;
	error?: string; 
}

const initialState: GlobalStatsState = {
	data: undefined,
	isLoading: false,
	error: undefined,
}

export const globalStatsSlice = createSlice({
	name: 'currency',
	initialState,
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
				(action.payload.prevCurrency === 'EUR' ||
					action.payload.prevCurrency === 'RUB') &&
				(action.payload.targetCurrency === 'EUR' ||
					action.payload.targetCurrency === 'RUB')
			) {
				// (RUB/EUR -> USD -> RUB/EUR)
				let currency = action.payload.prevCurrency;
				let currencyPrice = action.payload.kurs[currency];

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
