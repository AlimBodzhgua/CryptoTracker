import { useMemo } from 'react';
import { selectCurrentCurrency } from 'redux/selectors/currencySelectors';
import { useTranslation } from 'react-i18next';
import { NotationType } from 'types/coin';
import { selectCoinsPriceNotation } from 'redux/selectors/coinsSelectors';
import { useAppSelector } from './redux';

export const useFormatter = (
    // notation:NotationType = 'compact',
    minDigits:number = 4,
    maxDigits:number = 6,
) => {
    const currentCurrency = useAppSelector(selectCurrentCurrency);
    const notation = useAppSelector(selectCoinsPriceNotation);
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
