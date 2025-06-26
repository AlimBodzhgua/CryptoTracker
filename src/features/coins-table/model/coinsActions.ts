import { createAsyncThunk } from '@reduxjs/toolkit';
import { coinsSorter } from './utils';
import { SetURLSearchParams } from 'react-router-dom';
import type { Coin } from 'shared/types/coin';
import type { AppState } from 'app/store/config/AppState';
import type { AppDispatch } from 'app/store/config/store';
import coinApi from 'shared/api/coinApi';

import {
	selectCoins,
	selectCoinsIsLoading,
	selectCoinsPageHasMore,
	selectCoinsPageLimit,
	selectCoinsPageNumber,
	selectCoinsTag,
} from './coinsSelectors';
import { coinsActions } from './coinsSlice';

type PageNumber = number;

export const fetchCoins = createAsyncThunk<
	Coin[],
	PageNumber,
	{ rejectValue: string, state: AppState }
>(
	'fetchCoins',
	async (page, { rejectWithValue, getState }) => {
		const limit = selectCoinsPageLimit(getState());
		const tag = selectCoinsTag(getState());
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
		const page = selectCoinsPageNumber(getState());
		const hasMore = selectCoinsPageHasMore(getState());
		const isLoading = selectCoinsIsLoading(getState());

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
		const coins = selectCoins(getState());
		dispatch(coinsActions.setTag('All Coins'));
		setSearchParams('field=rank&sort=desc');
		const sortedCoins = coinsSorter(coins, 'desc', 'rank');
		dispatch(coinsActions.setSearchedFilteredCoins(sortedCoins));
		dispatch(coinsActions.setPriceNotation(undefined));
	},
);
