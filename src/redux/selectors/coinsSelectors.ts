import { StateSchema } from '../config/StateSchema';

export const selectCoins = (state: StateSchema) => state.coins.coins;

export const selectSearchedFilteredCoins = (state: StateSchema) => state.coins.searchedFilteredCoins;

export const selectCoinsIsLoading = (state: StateSchema) => state.coins.isLoading || false;

export const selectCoinsError = (state: StateSchema) => state.coins.error || '';

export const selectCoinsPageLimit = (state: StateSchema) => state.coins.limit;

export const selectCoinsPageNumber = (state: StateSchema) => state.coins.page;

export const selectCoinsPageHasMore = (state: StateSchema) => state.coins.hasMore;
