import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyType, IKurs } from 'types/currency';
import { fetchCurrency } from '../actions/currencyActions';

export interface CurrencySchema {
	currentCurrency: CurrencyType;
	targetCurrency?: CurrencyType;
    kurs?: IKurs;
	error?: string;
	isLoading: boolean;
}

const initialState: CurrencySchema = {
    currentCurrency: 'USD',
    targetCurrency: undefined,
    kurs: undefined,
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
        resetCurrentCurrency: (state) => {
            if (state.targetCurrency) {
                state.currentCurrency = state.targetCurrency;
                state.targetCurrency = undefined;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrency.pending, (state, action) => {
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
export { IKurs };
