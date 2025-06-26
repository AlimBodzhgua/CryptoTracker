import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'app/store/config/AppState';

export const selectCoins = (state: AppState) => state.coins.coins;
export const selectCoinsTag = (state: AppState) => state.coins.tag;
export const selectCoinsPriceNotation = (state: AppState) => state.coins.priceNotation;
export const selectSearchedFilteredCoins = (state: AppState) => state.coins.searchedFilteredCoins;
export const selectCoinsIsLoading = (state: AppState) => state.coins.isLoading || false;
export const selectCoinsError = (state: AppState) => state.coins.error || '';
export const selectCoinsPageLimit = (state: AppState) => state.coins.limit;
export const selectCoinsPageNumber = (state: AppState) => state.coins.page;
export const selectCoinsPageHasMore = (state: AppState) => state.coins.hasMore;
