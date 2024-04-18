import { selectCurrentCurrency } from 'redux/selectors/currencySelectors';
import { useMemo } from 'react';
import { useAppSelector } from './redux';

type NotationType = 'standard' | 'scientific' | 'engineering' | 'compact' | undefined;
type LocaleType = 'ru' | 'en' | undefined;

export const useFormatter = (
    locale:LocaleType = 'ru',
    notation:NotationType = 'compact',
    minDigits:number = 4,
    maxDigits:number = 6,
) => {
    const currentCurrency = useAppSelector(selectCurrentCurrency);

    const formatter = useMemo(() => Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currentCurrency,
        notation,
        minimumSignificantDigits: minDigits || undefined,
        maximumSignificantDigits: maxDigits || undefined,
    }), [currentCurrency, locale, notation, minDigits, maxDigits]);

    return formatter;
};
