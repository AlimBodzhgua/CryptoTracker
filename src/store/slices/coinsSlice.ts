import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyType, IKurs } from 'types/currency';
import {
	ICoin, IGlobalStats, NotationType, TagType,
} from 'types/coin';
import { fetchCoins, fetchGlobalStats } from '../actions/coinsActions';

export interface CoinsState {
	coins: ICoin[];
    searchedFilteredCoins: ICoin[];
    globalStats?: IGlobalStats;
    tag: TagType;
    priceNotation?: NotationType;

	isLoading: boolean;
	error?: string;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;
}

const initialState: CoinsState = {
	coins: [],
	searchedFilteredCoins: [],
	globalStats: undefined,
	tag: 'All Coins',
	priceNotation: undefined,

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
		setTag: (state, action: PayloadAction<TagType>) => {
			if (action.payload === 'All Coins') {
				state.page = -1;
			}
			state.tag = action.payload;
			state.coins = [];
			state.searchedFilteredCoins = [];
		},
		setPriceNotation: (state, action: PayloadAction<NotationType>) => {
			state.priceNotation = action.payload;
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
			if (state.page >= 8) {
				state.hasMore = false;
			}
		},
		resetCoinsState: (state) => {
			state.coins = [];
			state.searchedFilteredCoins = [];
			state.tag = 'All Coins';
			state.priceNotation = 'standard';
			state.page = 0;
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

				if (state.globalStats) {
					state.globalStats.btcDominance *= currencyPrice;
					state.globalStats.totalMarketCap = String(
						Number(state.globalStats.totalMarketCap) * currencyPrice,
					);
					state.globalStats.total24hVolume = String(
						Number(state.globalStats.total24hVolume) * currencyPrice,
					);
				}
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

				if (state.globalStats) {
					state.globalStats.btcDominance *= currencyPrice;
					state.globalStats.totalMarketCap = String(
						Number(state.globalStats.totalMarketCap) * currencyPrice,
					);
					state.globalStats.total24hVolume = String(
						Number(state.globalStats.total24hVolume) * currencyPrice,
					);
				}
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

				if (state.globalStats) {
					state.globalStats.btcDominance /= currencyPrice;
					state.globalStats.totalMarketCap = String(
						Number(state.globalStats.totalMarketCap) / currencyPrice,
					);
					state.globalStats.total24hVolume = String(
						Number(state.globalStats.total24hVolume) / currencyPrice,
					);
				}
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
			});
	},
});

export const { reducer: coinsReducer } = coinsSlice;
export const { actions: coinsActions } = coinsSlice;
