import { createAsyncThunk } from '@reduxjs/toolkit';
import coinApi from 'shared/api/coinApi';
import type { GlobalStats } from './types';

export const fetchGlobalStats = createAsyncThunk<GlobalStats, void, { rejectValue: string }>(
	'fetchGlobalStats',
	async (_, { rejectWithValue }) => {
		try {
			const response = await coinApi.get('/stats');
			return response.data.data as GlobalStats;
		} catch (error) {
			return rejectWithValue(JSON.stringify(error));
		}
	},
);
