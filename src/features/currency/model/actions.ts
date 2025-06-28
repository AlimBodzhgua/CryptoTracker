import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Kurs } from 'shared/types/coin';
import axios from 'axios';

const API_KEY = process.env.CURRENCY_API_KEY || '';
const CURRENCY_LINK = process.env.CURRENCY_LINK?.replace('API_KEY', API_KEY) || '';

export const fetchCurrency = createAsyncThunk<
	Kurs,
	void,
	{ rejectValue: string }
>(
	'fetchCurrency',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(CURRENCY_LINK);
			
			const kurs = {
				RUB: response.data.data['RUB'],
				EUR: response.data.data['EUR'],
			} satisfies Kurs;

			return kurs;
		} catch (e) {
			return rejectWithValue(JSON.stringify(e));
		}
	},
);
