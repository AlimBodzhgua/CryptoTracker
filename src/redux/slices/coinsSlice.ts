import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoin } from 'types/types';
import { fetchCoins } from '../actions/coinsActions';

export interface CoinsStateSchema {
	coins: ICoin[];
	isLoading: boolean;
	error?: string;
}

const initialState: CoinsStateSchema = {
    isLoading: false,
    error: undefined,
    coins: [],
};

export const coinsSlice = createSlice({
    name: 'coinSlice',
    initialState,
    reducers: {
        setCoins: (state, action: PayloadAction<ICoin[]>) => {
            state.coins = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoins.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCoins.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchCoins.fulfilled, (state, action) => {
                state.isLoading = false;
                state.coins = action.payload;
            });
    },
});

export const { reducer: coinsReducer } = coinsSlice;
export const { actions: coinsActions } = coinsSlice;
