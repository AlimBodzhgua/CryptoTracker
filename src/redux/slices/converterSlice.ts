import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialConverterData } from 'constants/converter';
import { convertCoins, fetchConverterCoins } from 'redux/actions/converterActions';
import { ConverterCoinType, IConverter } from 'types/converter';

export interface ConverterStateSchema {
	converterData: IConverter;
	isLoading: boolean;
	error?: string;
}

const initialState: ConverterStateSchema = {
    converterData: initialConverterData,
    isLoading: false,
    error: undefined,
};

export const converterSlice = createSlice({
    name: 'converterSlice',
    initialState,
    reducers: {
        setCoinFrom: (state, action: PayloadAction<ConverterCoinType>) => {
            state.converterData.coinFrom = action.payload;
        },
        setCoinTo: (state, action: PayloadAction<ConverterCoinType>) => {
            state.converterData.coinTo = action.payload;
        },
        switchCoins: (state) => {
            const { coinFrom } = state.converterData;
            state.converterData.coinFrom = state.converterData.coinTo;
            state.converterData.coinTo = coinFrom;
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
        // FetchConverterCoins
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
