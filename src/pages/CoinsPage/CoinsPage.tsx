import { FC } from 'react';
import { Button } from 'shared/UI/Button/Button';
import { useAppDispatch } from 'shared/hooks/redux';
import {
	CoinTable,
	useCoins,
	TagsSelector,
	PriceNotationSelector,
	CoinsSearchBar,
} from 'features/coins-table';
import { Page } from 'features/page';
import { AddToWatchListButton } from 'features/user';
import { currencyActions } from 'features/currency';
import { CURRENCY_LOCALSTORAGE_KEY } from 'shared/constants/localStorage';
import type { CurrencyType } from 'shared/types/coin';
import classnames from 'classnames';
import ResetIcon from './assets/reset.svg';
import classes from './CoinsPage.module.scss';

interface CoinsPageProps {
	className?: string;
}

const CoinsPage: FC<CoinsPageProps> = ({ className }) => {
	const { loadNextCoins, resetSettings } = useCoins({ afterFetch });
	const dispatch = useAppDispatch();

	function afterFetch() {
		const currency = localStorage.getItem(CURRENCY_LOCALSTORAGE_KEY);

		if (currency && currency !== 'USD') {
			dispatch(currencyActions.setCurrentCurrency(currency as CurrencyType));
		}
	}

	return (
		<Page
			className={classnames(classes.CoinsPage, className)}
			onScrollEnd={loadNextCoins}
			withAutoScrollTopBtn
		>
			<div className={classes.header}>
				<CoinsSearchBar />
				<div className={classes.actions}>
					<TagsSelector />
					<PriceNotationSelector />
					<Button
						className={classes.resetBtn}
						onClick={resetSettings}
					>
						<ResetIcon className={classes.resetIcon} />
					</Button>
				</div>
			</div>
			<CoinTable
				renderActionColumn={(coinId) => <AddToWatchListButton coinId={coinId}/>}
			/>
		</Page>
	);
};

export default CoinsPage;
