import { createAsyncThunk } from '@reduxjs/toolkit';
import { IKurs } from 'types/currency';
import axios from 'axios';

const API_KEY = process.env.CURRENCY_API;

export const fetchCurrency = createAsyncThunk<
	IKurs,
	void,
	{rejectValue: string}
>(
    'fetchCurrency',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`
                https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&currencies=EUR%2CRUB
            `);
            return response.data.data;
        } catch (e) {
            rejectWithValue(JSON.stringify(e));
        }
    },
);
