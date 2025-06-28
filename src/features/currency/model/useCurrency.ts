import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { currencySelectors } from './currencySlice';
import { useEffect } from 'react';
import { fetchCurrency } from './actions';

export const useCurrency = () => {
	const dispatch = useAppDispatch();
	const prevCurrency = useAppSelector(currencySelectors.selectPrevCurrency);
	const currentCurrency = useAppSelector(currencySelectors.selectCurrentCurrency);
	const kurs = useAppSelector(currencySelectors.selectCurrencyKurs);

	useEffect(() => {
		dispatch(fetchCurrency());
	}, [fetchCurrency]);

	return { prevCurrency, currentCurrency, kurs }
}