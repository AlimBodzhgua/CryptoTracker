import { createAsyncThunk } from '@reduxjs/toolkit';
import { ConverterCoinType } from 'types/converter';
import axios from 'axios';

export const convertCoins = createAsyncThunk<
	number,
	{
		coinFrom: ConverterCoinType,
		coinTo: ConverterCoinType,
		amount: number
	},
	{ rejectValue: string }
>(
    'convertCoins',
    async (data, { rejectWithValue }) => {
        try {
            // eslint-disable-next-line max-len
            const link = `https://api.coinconvert.net/convert/${data.coinFrom.symbol}/${data.coinTo.symbol}?amount=${data.amount}`;
            const response = await axios.get(link);
            if (response.data.status === 'success') {
                return response.data[`${data.coinTo.symbol}`];
            }
        } catch (error) {
            return rejectWithValue(JSON.stringify(error));
        }
    },
);

const coinHeaders = {
    'Content-Type': 'application/json',
    'x-access-token': process.env.API_KEY,
};

export const fetchConverterCoins = createAsyncThunk<
	ConverterCoinType[],
	void,
	{rejectValue: string}
>(
    'fetchConverterCoins',
    async (_, { rejectWithValue }) => {
        try {
            const limit = 20;
            const response = await axios.get('https://api.coinranking.com/v2/coins', {
                headers: coinHeaders,
                params: {
                    limit,
                },
            });
            return response.data.data.coins;
        } catch (error) {
            return rejectWithValue(JSON.stringify(error));
        }
    },
);
