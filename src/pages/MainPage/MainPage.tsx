import type { FC } from 'react';
import type { CurrencyType } from 'shared/types/coin';

import { useCallback } from 'react';
import { Page } from 'features/page';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { GlobalStats } from 'features/global-stats';
import { currencyActions, currencySelectors } from 'features/currency';
import { CURRENCY_LOCALSTORAGE_KEY } from 'shared/constants/localStorage';
import classnames from 'classnames';
import classes from './MainPage.module.scss';

interface MainPageProps {
	className?: string;
}

const MainPage: FC<MainPageProps> = ({ className }) => {
	const currentCurrency = useAppSelector(currencySelectors.selectCurrentCurrency);
	const dispatch = useAppDispatch();

	const initCurrency = useCallback(() => {
		const currency = localStorage.getItem(CURRENCY_LOCALSTORAGE_KEY);

		if (currency && currency !== 'USD') {
			dispatch(currencyActions.setCurrentCurrency(currency as CurrencyType));
		}
	}, [dispatch]);

	return (
		<Page className={classnames(classes.MainPage, className)}>
			<GlobalStats currentCurrency={currentCurrency} afterFetch={initCurrency} />
		</Page>
	);
};

export default MainPage;
