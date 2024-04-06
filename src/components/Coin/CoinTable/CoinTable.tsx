import React, { useEffect, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchCoins } from 'redux/actions/coinsActions';
import {
    selectCoinsIsLoading,
    selectCoinsError,
    selectSearchedFilteredCoins,
    selectCoinsPageNumber,
} from 'redux/selectors/coinsSelectors';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Message } from 'components/UI/Message/Message';
import classnames from 'classnames';
import { CoinItem } from '../CoinItem/CoinItem';
import { CoinsTableHeader } from './CoinsTableHeader';
import { CoinsTableSkeleton } from './CoinsTableSkeleton';

import classes from './CoinTable.module.scss';

interface CoinTableProps {
	className?: string;
}

export const CoinTable: React.FC<CoinTableProps> = memo(({ className }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const searchedFilteredCoins = useAppSelector(selectSearchedFilteredCoins);
    const isLoading = useAppSelector(selectCoinsIsLoading);
    const page = useAppSelector(selectCoinsPageNumber);
    const error = useAppSelector(selectCoinsError);

    const withHeader = useMemo(() => (page === 0), [page]);

    useEffect(() => {
        dispatch(fetchCoins({ page: 0 }));
    }, [dispatch]);

    if (error) {
        return (
            <Message
                type='error'
                text={t('Error fetching data, try to reload the page, or visiti the page later')}
                withIcon
            />
        );
    }

    return (
        <>
            <table className={classnames(classes.table, className)}>
                {searchedFilteredCoins.length
                    ? (
                        <>
                            <CoinsTableHeader />
                            <tbody>
                                {searchedFilteredCoins.map((coin) => (
                                    <CoinItem
                                        coin={coin}
                                        key={coin.symbol}
                                    />
                                ))}
                            </tbody>
                        </>
                    )
                    : null}
            </table>
            {isLoading
                && (
                    <CoinsTableSkeleton
                        withHeader={withHeader}
                        className={classes.tableSkeleton}
                    />
                )}
        </>
    );
});
