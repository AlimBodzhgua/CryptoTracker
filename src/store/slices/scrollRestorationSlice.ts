import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ScrollPage = string;
type scrollPosition = number;
type ScrollRestorationType = Record<ScrollPage, scrollPosition>;

export interface ScrollRestorationState {
	scroll: ScrollRestorationType;
}

const initialState: ScrollRestorationState = {
	scroll: {},
};

export const scrollRestorationSlice = createSlice({
	name: 'scrollRestoration',
	initialState,
	reducers: {
		setScroll: (state, action: PayloadAction<{ path: ScrollPage, position: scrollPosition }>) => {
			state.scroll[action.payload.path] = action.payload.position;
		},
	},
});

export const { reducer: scrollRestorationReducer } = scrollRestorationSlice;
export const { actions: scrollRestorationActions } = scrollRestorationSlice;
