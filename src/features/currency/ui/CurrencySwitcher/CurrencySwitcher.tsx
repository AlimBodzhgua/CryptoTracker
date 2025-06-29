import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { CURRENCY_LOCALSTORAGE_KEY } from 'shared/constants/localStorage';
import classnames from 'classnames';
import type { CurrencyType } from 'shared/types/coin';
import { Currencies } from '../../model/constants';
import { currencyActions, currencySelectors } from '../../model/currencySlice';
import classes from './CurrencySwitcher.module.scss';

interface CurrencySwitcherProps {
	className?: string;
}

export const CurrencySwitcher: FC<CurrencySwitcherProps> = memo((props) => {
	const { className } = props;
	const dispatch = useAppDispatch();
	const currency = useAppSelector(currencySelectors.selectCurrentCurrency);

	const onChangeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const targetCurrency = e.target.value as CurrencyType;
		dispatch(currencyActions.setCurrentCurrency(targetCurrency));
		localStorage.setItem(CURRENCY_LOCALSTORAGE_KEY, targetCurrency);
	};

	return (
		<select
			className={classnames(classes.CurrencySwitcher, className)}
			onChange={onChangeCurrency}
			data-testid='currency-switcher'
			value={currency}
		>
			{Object.values(Currencies).map((currency) => (
				<option
					value={currency}
					className={classes.CurrencyOption}
					key={currency}
				>
					{currency}
				</option>
			))}
		</select>
	);
});
