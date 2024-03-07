import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCurrency } from '../actions/currencyActions';

export const Currencies = {
    USD: 'USD',
    RUB: 'RUB',
    EUR: 'EUR',
} as const;

export type CurrencyType = keyof typeof Currencies;

export interface CurrencySchema {
	baseCurrency: CurrencyType;
	targetCurrency?: CurrencyType;
	RUB?: number;
	EUR?: number;
	error?: string;
	isLoading: boolean;
}

const initialState: CurrencySchema = {
    baseCurrency: 'USD',
    targetCurrency: 'USD',
    RUB: undefined,
    EUR: undefined,
    error: undefined,
    isLoading: false,
};

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setTargetCurrency: (state, action: PayloadAction<CurrencyType>) => {
            state.targetCurrency = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrency.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchCurrency.fulfilled, (state, action) => {
                state.EUR = action.payload.EUR;
                state.RUB = action.payload.RUB;
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
