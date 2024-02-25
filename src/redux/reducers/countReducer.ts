import { createSlice } from '@reduxjs/toolkit';

export interface CountStateSchema {
	count: number;
}

const initialState: CountStateSchema = {
    count: 0,
};

const countSlice = createSlice({
    name: 'countSlice',
    initialState,
    reducers: {
        increment(state) {
            state.count += 1;
        },
        decrement(state) {
            state.count -= 1;
        },
    },
});

export const { reducer: countReducer } = countSlice;
export const { actions: countActions } = countSlice;
