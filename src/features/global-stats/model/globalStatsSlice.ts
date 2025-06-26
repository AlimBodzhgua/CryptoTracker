import { createSlice } from '@reduxjs/toolkit';
import { fetchGlobalStats } from './actions';
import { GlobalStats } from './types';

export interface GlobalStatsState {
	data?: GlobalStats;
	isLoading: boolean;
	error?: string; 
}

const initialState: GlobalStatsState = {
	data: undefined,
	isLoading: false,
	error: undefined,
}

export const globalStatsSlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGlobalStats.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchGlobalStats.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchGlobalStats.rejected, (state, action) => {
				state.error = action.payload;
				state.isLoading = false;
			});
	},
});

export const { reducer: globalStatsReducer } = globalStatsSlice;
export const { actions: globalStatsActions } = globalStatsSlice;
