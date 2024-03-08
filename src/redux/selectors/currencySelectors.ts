import { StateSchema } from '../config/StateSchema';

export const selectCurrentCurrency = (state: StateSchema) => state.currency.currentCurrency || 'USD';

export const selectTargetCurrency = (state: StateSchema) => state.currency.targetCurrency;

export const selectCurrencyKurs = (state: StateSchema) => state.currency.kurs;
