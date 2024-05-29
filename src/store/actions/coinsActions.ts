import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICoin, IGlobalStats } from 'types/coin';
import { coinsSorter } from 'utils/utils';
import { SetURLSearchParams } from 'react-router-dom';
import coinApi from 'api/coinApi';
import { StateSchema } from '../config/StateSchema';
import {
	selectCoins,
	selectCoinsIsLoading,
	selectCoinsPageHasMore,
	selectCoinsPageLimit,
	selectCoinsPageNumber,
	selectCoinsTag,
} from '../selectors/coinsSelectors';
import { AppDispatch } from '../config/store';
import { coinsActions } from '../slices/coinsSlice';

interface FetchCoinsProps {
    page?: number;
}

export const fetchCoins = createAsyncThunk<
	ICoin[],
	FetchCoinsProps,
	{
        rejectValue: string,
        state: StateSchema,
    }
>(
	'fetchCoins',
	async (props, { rejectWithValue, getState }) => {
		const { page = 0 } = props;
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
    {
        state: StateSchema,
        dispatch: AppDispatch,
    }
>(
	'fetchNextCoins',
	async (_, { dispatch, getState }) => {
		const page = selectCoinsPageNumber(getState());
		const hasMore = selectCoinsPageHasMore(getState());
		const isLoading = selectCoinsIsLoading(getState());

		if (hasMore && !isLoading) {
			dispatch(coinsActions.setPage(page + 1));
			dispatch(fetchCoins({ page: page + 1 }));
		}
	},
);

export const fetchGlobalStats = createAsyncThunk<
    IGlobalStats,
    void,
    {
        rejectValue: string,
    }
>(
	'fetchGlobalStats',
	async (_, { rejectWithValue }) => {
		try {
			const response = await coinApi.get('/stats');
			return response.data.data as IGlobalStats;
		} catch (error) {
			return rejectWithValue(JSON.stringify(error));
		}
	},
);

export const resetCoinsSettings = createAsyncThunk<
    void,
    SetURLSearchParams,
    {
        dispatch: AppDispatch,
        state: StateSchema,
    }
>(
	'resetCoinsSettings',
	async (setSearchParams, { dispatch, getState }) => {
		const coins = selectCoins(getState());
		dispatch(coinsActions.setTag('All Coins'));
		setSearchParams('field=rank&by=ascending');
		const sortedCoins = coinsSorter(coins, 'ascending', 'rank');
		dispatch(coinsActions.setSearchedFilteredCoins(sortedCoins));
		dispatch(coinsActions.setPriceNotation(undefined));
	},
);
