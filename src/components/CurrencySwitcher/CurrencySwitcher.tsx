import React from 'react';
import { useAppDispatch } from 'hooks/redux';
import {
    Currencies,
    CurrencyType,
    currencyActions,
} from 'redux/slices/currencySlice';
import classnames from 'classnames';
import classes from './CurrencySwitcher.module.scss';

interface CurrencySwitcherProps {
	className?: string;
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = (props) => {
    const { className } = props;
    const dispatch = useAppDispatch();

    const onCurrencySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const targetCurrency = e.target.value as CurrencyType;
        dispatch(currencyActions.setTargetCurrency(targetCurrency));
    };

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
};
