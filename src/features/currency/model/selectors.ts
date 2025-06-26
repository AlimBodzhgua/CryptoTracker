import { AppState } from 'app/store/config/AppState';

export const selectCurrentCurrency = (state: AppState) => state.currency.currentCurrency || 'USD';

export const selectTargetCurrency = (state: AppState) => state.currency.targetCurrency;

export const selectCurrencyKurs = (state: AppState) => state.currency.kurs;
