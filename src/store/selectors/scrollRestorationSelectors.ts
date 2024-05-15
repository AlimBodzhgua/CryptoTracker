import { StateSchema } from '../config/StateSchema';

export const selectScroll = (state: StateSchema) => state.scrollRestoration.scroll;

export const selectScrollByPath = (state: StateSchema, path: string) => (
	state.scrollRestoration.scroll[path] || 0
);
