import { StateSchema } from '../config/StateSchema';

export const selectUser = (state: StateSchema) => state.user.authData;

export const selectUserIsLoading = (state: StateSchema) => state.user.isLoading;

export const selectUserError = (state: StateSchema) => state.user.error;
