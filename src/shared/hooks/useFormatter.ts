import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { CurrencyType, NotationType } from '../types/coin';

type FormatterParams = {
	notation: NotationType;
	currentCurrency: CurrencyType;
	minDigits?: number;
	maxDigits?: number;
}

export const useFormatter = ({
	notation,
	currentCurrency,
	minDigits = 6,
	maxDigits = 6,
}: FormatterParams) => {
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
