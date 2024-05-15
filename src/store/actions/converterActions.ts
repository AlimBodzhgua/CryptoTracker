import { createAsyncThunk } from '@reduxjs/toolkit';
import { ConverterCoinType } from 'types/converter';
import axios from 'axios';
import coinApi from 'api/coinApi';

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

export const fetchConverterCoins = createAsyncThunk<
	ConverterCoinType[],
	void,
	{rejectValue: string}
>(
	'fetchConverterCoins',
	async (_, { rejectWithValue }) => {
		try {
			const limit = 20;
			const response = await coinApi.get('/coins', {
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
