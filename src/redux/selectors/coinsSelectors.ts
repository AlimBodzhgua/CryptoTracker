import { StateSchema } from '../config/StateSchema';

export const selectCoins = (state: StateSchema) => state.coins.coins;

export const selectCoinsIsLoading = (state: StateSchema) => state.coins.isLoading || false;

export const selectCoinsError = (state: StateSchema) => state.coins.error || '';
