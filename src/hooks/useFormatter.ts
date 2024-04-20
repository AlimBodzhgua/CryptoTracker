import { useMemo } from 'react';
import { selectCurrentCurrency } from 'redux/selectors/currencySelectors';
import { useAppSelector } from './redux';
import { useTranslation } from 'react-i18next';

type NotationType = 'standard' | 'scientific' | 'engineering' | 'compact' | undefined;

export const useFormatter = (
    notation:NotationType = 'compact',
    minDigits:number = 4,
    maxDigits:number = 6,
) => {
    const currentCurrency = useAppSelector(selectCurrentCurrency);
    const { i18n } = useTranslation();

    const formatter = useMemo(() => Intl.NumberFormat(i18n.language, {
        style: 'currency',
        currency: currentCurrency,
        notation,
        minimumSignificantDigits: minDigits || undefined,
        maximumSignificantDigits: maxDigits || undefined,
    }), [currentCurrency, i18n.language, notation, minDigits, maxDigits]);

    return formatter;
};
