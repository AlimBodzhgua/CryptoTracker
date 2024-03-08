import React, { memo, useCallback } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { currencyActions } from 'redux/slices/currencySlice';
import { CurrencyType } from 'types/currency';
import { Currencies } from 'constants/currencies';
import classnames from 'classnames';
import classes from './CurrencySwitcher.module.scss';

interface CurrencySwitcherProps {
	className?: string;
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = memo((props) => {
    const { className } = props;
    const dispatch = useAppDispatch();

    const onCurrencySelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const targetCurrency = e.target.value as CurrencyType;
        dispatch(currencyActions.setTargetCurrency(targetCurrency));
    }, [dispatch]);

    return (
        <select
            className={classnames(classes.CurrencySwitcher, className)}
            onChange={onCurrencySelect}
        >
            <option
                value={Currencies.USD}
                className={classes.CurrencyOption}
            >
                USD
            </option>
            <option
                value={Currencies.EUR}
                className={classes.CurrencyOption}
            >
                EUR
            </option>
            <option
                value={Currencies.RUB}
                className={classes.CurrencyOption}
            >
                RUB
            </option>
        </select>
    );
});
