import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../config/StateSchema';

export const selectUser = (state: StateSchema) => state.user.authData;

export const selectUserIsLoading = (state: StateSchema) => state.user.isLoading;

export const selectUserError = (state: StateSchema) => state.user.error;

export const selectUserMounted = (state: StateSchema) => state.user._mounted;

export const selectUserConversionHistory = createSelector(
    selectUser,
    (authData) => authData?.conversionHistory || [],
);

export const selectUserWatchList = createSelector(
    selectUser,
    (authData) => authData?.watchList || [],
);
