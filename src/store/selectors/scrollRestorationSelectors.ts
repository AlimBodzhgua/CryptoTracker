import { AppState } from '../config/AppState';

export const selectScroll = (state: AppState) => state.scrollRestoration.scroll;

export const selectScrollByPath = (state: AppState, path: string) => (
	state.scrollRestoration.scroll[path] || 0
);
