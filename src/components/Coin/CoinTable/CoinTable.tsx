import React from 'react';
import { useGetCoinsQuery } from 'redux/api/coinApi';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'components/UI/Skeleton/Skeleton';
import classnames from 'classnames';
import classes from './CoinTable.module.scss';
import { CoinItem } from '../CoinItem/CoinItem';

interface CoinTableProps {
	className?: string;
}

export const CoinTable: React.FC<CoinTableProps> = ({ className }) => {
    const { t } = useTranslation();
    const { data: coins, isLoading, error } = useGetCoinsQuery('12');
    // const isLoading = true;

    if (error) {
        return (
            <h1>{t('Error fetching coins')}</h1>
        );
    }

    if (isLoading) {
        return (
            <table className={
                classnames(classes.table, className, { separate: isLoading })
            }
            >
                <thead className={classes.header}>
                    <tr className={classes.row}>
                        <th><Skeleton width={95} height={30} /></th>
                        <th><Skeleton width={95} height={30} /></th>
                        <th><Skeleton width={95} height={30} /></th>
                        <th><Skeleton width={95} height={30} /></th>
                        <th><Skeleton width={95} height={30} /></th>
                    </tr>
                </thead>
                <tbody>
                    {new Array(12).fill(0).map(() => (
                        <tr>
                            <th colSpan={5}>
                                <Skeleton width={650} height={35} />
                            </th>
                        </tr>
				    ))}
                </tbody>
            </table>
    	);
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
