import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICoin } from 'types/coin';
import axios from 'axios';

const coinHeaders = {
    'Content-Type': 'application/json',
    'x-access-token': process.env.API_KEY,
};

export const fetchCoins = createAsyncThunk<
	ICoin[],
	number,
	{ rejectValue: string}
>(
    'fetchCoins',
    // eslint-disable-next-line default-param-last
    async (limit = 14, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://api.coinranking.com/v2/coins', {
                headers: coinHeaders,
                params: {
                    limit,
                },
            });
            console.log('fetch coins');
            return response.data.data.coins;
        } catch (e) {
            return rejectWithValue(JSON.stringify(e));
        }
    },
);
