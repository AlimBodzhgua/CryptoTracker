import { createSelector } from '@reduxjs/toolkit';
import { AppState } from 'app/store/config/AppState';

export const selectUser = (state: AppState) => state.user.authData;

export const selectUserIsLoading = (state: AppState) => state.user.isLoading;

export const selectUserError = (state: AppState) => state.user.error;

export const selectUserMounted = (state: AppState) => state.user._mounted;

export const selectUserConversionHistory = createSelector(
	selectUser,
	(authData) => authData?.conversionHistory || [],
);

export const selectUserWatchListCoins = createSelector(
	selectUser,
	(authData) => authData?.watchList.coins || [],
);

export const selectUserWatchListIds = createSelector(
	selectUser,
	(authData) => authData?.watchList.ids || [],
);
