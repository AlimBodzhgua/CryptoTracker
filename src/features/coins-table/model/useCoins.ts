import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { selectCoins, selectCoinsPageNumber } from './coinsSelectors';
import { useSearchParams } from 'react-router-dom';
import { fetchCoins, fetchNextCoins, resetCoinsSettings } from './coinsActions';

export const useCoins = () => {
	const dispatch = useAppDispatch();
	const page = useAppSelector(selectCoinsPageNumber);
	const coins = useAppSelector(selectCoins);
	const [_, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			if (!coins.length) dispatch(fetchCoins(page));
		}
	}, [dispatch]);

	const loadNextCoins = useCallback(() => {
		dispatch(fetchNextCoins());
	}, [dispatch]);

	const resetSettings = useCallback(() => {
		dispatch(resetCoinsSettings(setSearchParams));
	}, [dispatch]);

	return { fetchCoins, loadNextCoins, resetSettings }
}