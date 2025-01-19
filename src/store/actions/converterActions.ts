import { createAsyncThunk } from '@reduxjs/toolkit';
import { ConverterCoinType } from 'types/converter';
import axios from 'axios';
import coinApi from 'api/coinApi';

const BASE_CONVERTER_LINK = 'https://api.coinconvert.net/convert/COIN_FROM/COIN_TO?amount=AMOUNT';

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
			const link = BASE_CONVERTER_LINK
				.replace('COIN_FROM', data.coinFrom.symbol)
				.replace('COIN_TO', data.coinTo.symbol)
				.replace('AMOUNT', String(data.amount))

			const response = await axios.get(link);
			return response.data[`${data.coinTo.symbol}`];
		} catch (error) {
			return rejectWithValue(JSON.stringify(error));
		}
	},
);

export const fetchConverterCoins = createAsyncThunk<
	ConverterCoinType[],
	void,
	{ rejectValue: string }
>(
	'fetchConverterCoins',
	async (_, { rejectWithValue }) => {
		try {
			const limit = 50;
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
