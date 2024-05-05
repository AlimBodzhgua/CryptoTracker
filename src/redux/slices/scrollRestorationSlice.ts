import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ScrollRestorationType = Record<string, number>;

export interface ScrollRestorationStateSchema {
	scroll: ScrollRestorationType;
}

const initialState: ScrollRestorationStateSchema = {
    scroll: {},
};

export const scrollRestorationSlice = createSlice({
    name: 'scrollRestoration',
    initialState,
    reducers: {
        setScroll: (state, action: PayloadAction<{path: string, position: number}>) => {
            state.scroll[action.payload.path] = action.payload.position;
        },
    }
});

export const { reducer: scrollRestorationReducer } = scrollRestorationSlice;
export const { actions: scrollRestorationActions } = scrollRestorationSlice;
