import { AppState } from 'app/store/config/AppState';

export const selectCurrentCurrency = (state: AppState) => state.currency.currentCurrency;
export const selectPrevCurrency = (state: AppState) => state.currency.prevCurrency;
export const selectCurrencyKurs = (state: AppState) => state.currency.kurs;
