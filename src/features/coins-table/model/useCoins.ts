import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { fetchCoins, fetchNextCoins, resetCoinsSettings } from './coinsActions';
import { coinsSelectors } from './coinsSlice';

type UseCoinsParams = {
	afterFetch: () => void;
};

export const useCoins = ({ afterFetch }: UseCoinsParams) => {
	const dispatch = useAppDispatch();
	const page = useAppSelector(coinsSelectors.selectCoinsPageNumber);
	const coins = useAppSelector(coinsSelectors.selectCoins);
	const [_, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (__PROJECT__ !== 'storybook' && !coins.length) {
			dispatch(fetchCoins(page)).then(() => {
				if (afterFetch) afterFetch();
			});
		}
	}, [dispatch]);

	const loadNextCoins = useCallback(() => {
		dispatch(fetchNextCoins());
	}, [dispatch]);

	const resetSettings = useCallback(() => {
		dispatch(resetCoinsSettings(setSearchParams));
	}, [dispatch]);

	return { fetchCoins, loadNextCoins, resetSettings };
};
