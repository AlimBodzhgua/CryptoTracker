import { CurrencyType } from 'redux/slices/currencySlice';
import { StateSchema } from '../config/StateSchema';

export const selectTargetCurrency = (state: StateSchema) => state.currency.targetCurrency || 'USD';

export const selectTargetCurrencyPrice = (state: StateSchema) => {
    const target = state.currency.targetCurrency as CurrencyType;
    return state.currency[target === 'RUB' ? 'RUB' : 'EUR'];
};
