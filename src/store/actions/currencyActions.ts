import { createAsyncThunk } from '@reduxjs/toolkit';
import { IKurs } from 'types/currency';
import axios from 'axios';

const API_KEY = process.env.CURRENCY_API || '';
const CURRENCY_LINK = process.env.CURRENCY_LINK?.replace('API_KEY', API_KEY) || '';

export const fetchCurrency = createAsyncThunk<
	IKurs,
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
