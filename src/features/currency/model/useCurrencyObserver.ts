import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { selectCurrencyKurs, selectCurrentCurrency, selectTargetCurrency } from './selectors';
import { useEffect } from 'react';
import { fetchCurrency } from './actions';

export const useCurrency = () => {
	const dispatch = useAppDispatch();
	const targetCurrency = useAppSelector(selectTargetCurrency);
	const currentCurrency = useAppSelector(selectCurrentCurrency);
	const kurs = useAppSelector(selectCurrencyKurs);

	useEffect(() => {
		dispatch(fetchCurrency());
	}, [fetchCurrency]);

	// useEffect(() => {
	// 	if (kurs && targetCurrency) {
	// 		dispatch(coinsActions.changeCoinsCurrency({
	// 			kurs,
	// 			currentCurrency,
	// 			targetCurrency,
	// 		}));
	// 		dispatch(currencyActions.resetCurrentCurrency());
	// 	}
	// }, [dispatch, targetCurrency]);

	return { targetCurrency, currentCurrency, kurs }
}