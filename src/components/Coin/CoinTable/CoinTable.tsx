import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'components/UI/Skeleton/Skeleton';
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

export const CoinTable: React.FC<CoinTableProps> = ({ className }) => {
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
                    <th>#</th>
                    <th>{t('Name')}</th>
                    <th>{t('Price')}</th>
                    <th>{t('Change')}</th>
                    <th>{t('24h volume')}</th>
                    <th>{t('Market cap')}</th>
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
};
