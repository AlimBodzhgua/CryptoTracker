import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CurrencyType, Kurs, Coin, NotationType, TagType } from 'shared/types/coin';
import { fetchCoins } from './coinsActions';

export interface CoinsState {
	coins: Coin[];
    searchedFilteredCoins: Coin[];
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
	//globalStats: undefined,
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
		setCoins: (state, action: PayloadAction<Coin[]>) => {
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
		setSearchedFilteredCoins: (state, action: PayloadAction<Coin[]>) => {
			state.searchedFilteredCoins = action.payload;
		},
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

				state.coins = state.coins.map((coin) => ({
					...coin,
					price: String(Number(coin.price) * currencyPrice),
					marketCap: String(Number(coin.marketCap) * currencyPrice),
					'24hVolume': String(Number(coin['24hVolume']) * currencyPrice),
				}));
			} else if (
				(action.payload.prevCurrency === 'EUR' ||
					action.payload.prevCurrency === 'RUB') &&
				(action.payload.targetCurrency === 'EUR' ||
					action.payload.targetCurrency === 'RUB')
			) {
				// (RUB/EUR -> USD -> RUB/EUR)
				let currency = action.payload.prevCurrency;
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
				const currency = action.payload.prevCurrency;
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
			});
	},
});

export const { reducer: coinsReducer } = coinsSlice;
export const { actions: coinsActions } = coinsSlice;
