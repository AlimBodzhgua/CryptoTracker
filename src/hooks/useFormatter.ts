import { selectTargetCurrency } from 'redux/selectors/currencySelectors';
import { useMemo } from 'react';
import { useAppSelector } from './redux';

type NotationType = 'standard' | 'scientific' | 'engineering' | 'compact' | undefined;
type LocaleType = 'ru' | 'en' | undefined;

export const useFormatter = (locale:LocaleType = 'ru', notation:NotationType = 'standard') => {
    const targetCurrency = useAppSelector(selectTargetCurrency);

    const formatter = useMemo(() => Intl.NumberFormat(locale, {
        style: 'currency',
        currency: targetCurrency,
        notation,
    }), [targetCurrency, locale, notation]);

    return formatter;
};
