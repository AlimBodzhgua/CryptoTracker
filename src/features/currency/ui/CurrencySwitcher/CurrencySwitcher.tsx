import { FC, memo } from 'react';
import { useAppDispatch } from 'shared/hooks/redux';
import classnames from 'classnames';
import type { CurrencyType } from 'shared/types/coin';
import { Currencies } from '../../model/constants';
import { currencyActions } from '../../model/currencySlice';
import classes from './CurrencySwitcher.module.scss';

interface CurrencySwitcherProps {
	className?: string;
}

export const CurrencySwitcher: FC<CurrencySwitcherProps> = memo((props) => {
	const { className } = props;
	const dispatch = useAppDispatch();

	const onChangeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const targetCurrency = e.target.value as CurrencyType;
		dispatch(currencyActions.setCurrentCurrency(targetCurrency));
	};

	return (
		<select
			className={classnames(classes.CurrencySwitcher, className)}
			onChange={onChangeCurrency}
			data-testid='currency-switcher'
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
