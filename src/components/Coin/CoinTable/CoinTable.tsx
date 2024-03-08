import React, { useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchCoins } from 'redux/actions/coinsActions';
import {
    selectCoins,
    selectCoinsIsLoading,
    selectCoinsError,
} from 'redux/selectors/coinsSelectors';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import classnames from 'classnames';
import { CoinItem } from '../CoinItem/CoinItem';
import classes from './CoinTable.module.scss';
import { CoinsTableSkeleton } from './CoinsTableSkeleton';

interface CoinTableProps {
	className?: string;
}

export const CoinTable: React.FC<CoinTableProps> = memo(({ className }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const coins = useAppSelector(selectCoins);
    const isLoading = useAppSelector(selectCoinsIsLoading);
    const error = useAppSelector(selectCoinsError);

    useEffect(() => {
        dispatch(fetchCoins(12));
    }, [dispatch]);

    if (error) {
        return (
            <h1>{t('Error fetching coins')}</h1>
        );
    }

    if (isLoading) {
        return <CoinsTableSkeleton />;
    }

    return (
        <table className={classnames(classes.table, className)}>
            <thead className={classes.header}>
                <tr className={classes.row}>
                    <th className={classes.colHeader}>#</th>
                    <th className={classes.colHeader}>{t('Name')}</th>
                    <th className={classes.colHeader}>{t('Price')}</th>
                    <th className={classes.colHeader}>{t('Change')}</th>
                    <th className={classes.colHeader}>{t('24h volume')}</th>
                    <th className={classes.colHeader}>{t('Market cap')}</th>
                </tr>
            </thead>
            <tbody>
                {coins && (coins.map((coin) => (
                    <CoinItem
                        coin={coin}
                        key={coin.symbol}
                    />
                )))}
            </tbody>
        </table>
    );
});
