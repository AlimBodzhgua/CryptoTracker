import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Kurs } from './types';
import axios from 'axios';

const API_KEY = process.env.CURRENCY_API || '';
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
			return response.data.data;
		} catch (e) {
			return rejectWithValue(JSON.stringify(e));
		}
	},
);
