import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICoin } from 'types/coin';
import { StateSchema } from 'redux/config/StateSchema';
import {
    selectCoinsIsLoading,
    selectCoinsPageHasMore,
    selectCoinsPageLimit,
    selectCoinsPageNumber,
} from 'redux/selectors/coinsSelectors';
import { AppDispatch } from 'redux/config/store';
import { coinsActions } from 'redux/slices/coinsSlice';
import axios from 'axios';

const coinHeaders = {
    'Content-Type': 'application/json',
    'x-access-token': process.env.API_KEY,
};

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
    // eslint-disable-next-line default-param-last
    async (props, { rejectWithValue, getState }) => {
        const { page = 0 } = props;
        const limit = selectCoinsPageLimit(getState());
        try {
            const response = await axios.get('https://api.coinranking.com/v2/coins', {
                headers: coinHeaders,
                params: {
                    limit,
                    offset: page * limit,
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
        const limit = selectCoinsPageLimit(getState());
        const hasMore = selectCoinsPageHasMore(getState());
        const isLoading = selectCoinsIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(coinsActions.setPage(page + 1));
            dispatch(fetchCoins({ page: page + 1 }));
        }
    },
);
