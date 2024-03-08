import { selectCurrentCurrency } from 'redux/selectors/currencySelectors';
import { useMemo } from 'react';
import { useAppSelector } from './redux';

type NotationType = 'standard' | 'scientific' | 'engineering' | 'compact' | undefined;
type LocaleType = 'ru' | 'en' | undefined;

export const useFormatter = (locale:LocaleType = 'ru', notation:NotationType = 'compact') => {
    const currentCurrency = useAppSelector(selectCurrentCurrency);

    const formatter = useMemo(() => Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currentCurrency,
        notation,
    }), [currentCurrency, locale, notation]);

    return formatter;
};
