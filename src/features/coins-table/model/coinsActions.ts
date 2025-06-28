import { createAsyncThunk } from '@reduxjs/toolkit';
import { SetURLSearchParams } from 'react-router-dom';
import coinApi from 'shared/api/coinApi';
import type { Coin } from 'shared/types/coin';
import type { AppState } from 'app/store/config/AppState';
import type { AppDispatch } from 'app/store/config/store';
import { coinsSorter } from './utils';
import { coinsActions, coinsSelectors } from './coinsSlice';

type PageNumber = number;

export const fetchCoins = createAsyncThunk<
	Coin[],
	PageNumber,
	{ rejectValue: string, state: AppState }
>(
	'fetchCoins',
	async (page, { rejectWithValue, getState }) => {
		const limit = coinsSelectors.selectCoinsPageLimit(getState());
		const tag = coinsSelectors.selectCoinsTag(getState());
		try {
			const response = await coinApi.get('/coins', {
				params: {
					limit,
					offset: page * limit,
					...(tag !== 'All Coins') && { tags: tag },
				},
			});
			return response.data.data.coins;
		} catch (e) {
			return rejectWithValue(JSON.stringify(e));
		}
	},
);

export const fetchNextCoins = createAsyncThunk<
    void,
    void,
    { state: AppState, dispatch: AppDispatch }
>(
	'fetchNextCoins',
	async (_, { dispatch, getState }) => {
		const page = coinsSelectors.selectCoinsPageNumber(getState());
		const hasMore = coinsSelectors.selectCoinsPageHasMore(getState());
		const isLoading = coinsSelectors.selectCoinsIsLoading(getState());

		if (hasMore && !isLoading) {
			dispatch(coinsActions.setPage(page + 1));
			dispatch(fetchCoins(page + 1));
		}
	},
);

export const resetCoinsSettings = createAsyncThunk<
    void,
    SetURLSearchParams,
    { dispatch: AppDispatch, state: AppState }
>(
	'resetCoinsSettings',
	async (setSearchParams, { dispatch, getState }) => {
		const coins = coinsSelectors.selectCoins(getState());
		dispatch(coinsActions.setTag('All Coins'));
		setSearchParams('field=rank&sort=desc');
		const sortedCoins = coinsSorter(coins, 'desc', 'rank');
		dispatch(coinsActions.setSearchedFilteredCoins(sortedCoins));
		dispatch(coinsActions.setPriceNotation(undefined));
	},
);
