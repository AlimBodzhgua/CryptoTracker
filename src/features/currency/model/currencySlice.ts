import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CurrencyType, Kurs } from 'shared/types/coin';
import { fetchCurrency } from './actions';

export interface CurrencyState {
	prevCurrency?: CurrencyType;
	currentCurrency: CurrencyType;

	kurs?: Kurs;
	error?: string;
	isLoading: boolean;
}

const initialState: CurrencyState = {
	prevCurrency: undefined,
	currentCurrency: 'USD',

	kurs: undefined,
	error: undefined,
	isLoading: false,
};

export const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setPrevCurrency: (state, action: PayloadAction<CurrencyType>) => {
			state.prevCurrency = action.payload;
		},
		setCurrentCurrency: (state, action: PayloadAction<CurrencyType>) => {
			state.prevCurrency = state.currentCurrency;
			state.currentCurrency = action.payload;
		},
		resetCurrentCurrency: (state) => {
			if (state.currentCurrency) {
				state.currentCurrency = state.currentCurrency;
				state.prevCurrency = undefined;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCurrency.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchCurrency.fulfilled, (state, action) => {
				state.kurs = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchCurrency.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const { reducer: currencyReducer } = currencySlice;
export const { actions: currencyActions } = currencySlice;
