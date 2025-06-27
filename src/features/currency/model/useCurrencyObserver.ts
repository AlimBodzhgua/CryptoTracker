import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { selectCurrencyKurs, selectCurrentCurrency, selectPrevCurrency } from './selectors';
import { useEffect } from 'react';
import { fetchCurrency } from './actions';

export const useCurrency = () => {
	const dispatch = useAppDispatch();
	const prevCurrency = useAppSelector(selectPrevCurrency);
	const currentCurrency = useAppSelector(selectCurrentCurrency);
	const kurs = useAppSelector(selectCurrencyKurs);

	useEffect(() => {
		dispatch(fetchCurrency());
	}, [fetchCurrency]);

	return { prevCurrency, currentCurrency, kurs }
}