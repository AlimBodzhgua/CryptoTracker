import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialConverterData } from './constants';
import type { ConverterCoinType, Converter } from './types';
import { convertCoins, fetchConverterCoins } from './actions';

export interface ConverterState {
	converterData: Converter;
	isLoading: boolean;
	error?: string;
}

const initialState: ConverterState = {
	converterData: initialConverterData,
	isLoading: false,
	error: undefined,
};

export const converterSlice = createSlice({
	name: 'converter',
	initialState,
	selectors: {
		selectConverterCoinFrom: (state) => state.converterData.coinFrom,
		selectConverterCoinTo: (state) => state.converterData.coinTo,
		selectConverterCoins: (state) => state.converterData.converterCoins,
		selecetConverterResult: (state) => state.converterData.convertResult,
		selectConverterIsLoading: (state) => state.isLoading,
		selectConverterError: (state) => state.error,
	},
	reducers: {
		setCoinFrom: (state, action: PayloadAction<ConverterCoinType>) => {
			state.converterData.convertResult = 0;
			state.converterData.coinFrom = action.payload;
		},
		setCoinTo: (state, action: PayloadAction<ConverterCoinType>) => {
			state.converterData.convertResult = 0;
			state.converterData.coinTo = action.payload;
		},
		switchCoins: (state) => {
			const { coinFrom } = state.converterData;
			state.converterData.convertResult = 0;
			state.converterData.coinFrom = state.converterData.coinTo;
			state.converterData.coinTo = coinFrom;
		},
		resetResult: (state) => {
			state.converterData.convertResult = 0;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(convertCoins.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(convertCoins.fulfilled, (state, action) => {
				state.converterData.convertResult = action.payload;
				state.isLoading = false;
			})
			.addCase(convertCoins.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			})
			// fetchConverterCoins
			.addCase(fetchConverterCoins.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchConverterCoins.fulfilled, (state, action) => {
				state.converterData.converterCoins = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchConverterCoins.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const { reducer: converterReducer } = converterSlice;
export const { actions: converterActions } = converterSlice;
export const { selectors: converterSelectors } = converterSlice;
