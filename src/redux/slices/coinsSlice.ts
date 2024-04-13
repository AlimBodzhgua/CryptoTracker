import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyType, IKurs } from 'types/currency';
import { ICoin, IGlobalStats } from 'types/coin';
import { fetchCoins, fetchGlobalStats, fetchWatchListCoins } from '../actions/coinsActions';

export interface CoinsStateSchema {
	coins: ICoin[];
    searchedFilteredCoins: ICoin[];
    globalStats?: IGlobalStats;

	isLoading: boolean;
	error?: string;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;
}

const initialState: CoinsStateSchema = {
    coins: [],
    searchedFilteredCoins: [],
    globalStats: undefined,

    isLoading: false,
    error: undefined,

    page: 0,
    limit: 12,
    hasMore: true,
};

export const coinsSlice = createSlice({
    name: 'coinSlice',
    initialState,
    reducers: {
        setCoins: (state, action: PayloadAction<ICoin[]>) => {
            state.coins = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
            if (state.page >= 8) {
                state.hasMore = false;
            }
        },
        setSearchedFilteredCoins: (state, action: PayloadAction<ICoin[]>) => {
            state.searchedFilteredCoins = action.payload;
        },
        changeCoinsCurrency: (state, action: PayloadAction<{
            kurs: IKurs,
            currentCurrency: CurrencyType,
            targetCurrency: CurrencyType | undefined
        }>) => {
            if (action.payload.currentCurrency === 'USD') {
                // USD -> RUB/EUR
                const currency = action.payload.targetCurrency === 'EUR' ? 'EUR' : 'RUB';
                const currencyPrice = action.payload.kurs[currency];
                state.coins = state.coins.map((coin) => ({
                    ...coin,
                    price: String(Number(coin.price) * currencyPrice),
                    marketCap: String(Number(coin.marketCap) * currencyPrice),
                    '24hVolume': String(Number(coin['24hVolume']) * currencyPrice),
                }));
            } else if (
                (action.payload.currentCurrency === 'EUR' || action.payload.currentCurrency === 'RUB')
                && (action.payload.targetCurrency === 'EUR' || action.payload.targetCurrency === 'RUB')
            ) {
                // (RUB/EUR -> USD -> RUB/EUR)
                let currency = action.payload.currentCurrency;
                let currencyPrice = action.payload.kurs[currency];

                state.coins = state.coins.map((coin) => ({
                    ...coin,
                    price: String(Number(coin.price) / currencyPrice),
                    marketCap: String(Number(coin.marketCap) / currencyPrice),
                    '24hVolume': String(Number(coin['24hVolume']) / currencyPrice),
                }));

                currency = action.payload.targetCurrency === 'EUR' ? 'EUR' : 'RUB';
                currencyPrice = action.payload.kurs[currency];

                state.coins = state.coins.map((coin) => ({
                    ...coin,
                    price: String(Number(coin.price) * currencyPrice),
                    marketCap: String(Number(coin.marketCap) * currencyPrice),
                    '24hVolume': String(Number(coin['24hVolume']) * currencyPrice),
                }));
            } else {
                // ('RUB/EUR -> USD')
                const currency = action.payload.currentCurrency;
                const currencyPrice = action.payload.kurs[currency];

                state.coins = state.coins.map((coin) => ({
                    ...coin,
                    price: String(Number(coin.price) / currencyPrice),
                    marketCap: String(Number(coin.marketCap) / currencyPrice),
                    '24hVolume': String(Number(coin['24hVolume']) / currencyPrice),
                }));
            }
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
                state.coins = state.coins.concat(action.payload);
            })
            // fetchGlobalStats
            .addCase(fetchGlobalStats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGlobalStats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchGlobalStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.globalStats = action.payload;
            })
            // fetchWatchListCoins
            .addCase(fetchWatchListCoins.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchWatchListCoins.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchWatchListCoins.fulfilled, (state) => {
                state.isLoading = false;
            });
    },
});

export const { reducer: coinsReducer } = coinsSlice;
export const { actions: coinsActions } = coinsSlice;
