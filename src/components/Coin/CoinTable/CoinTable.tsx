import React, { useEffect, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchCoins } from 'redux/actions/coinsActions';
import {
    selectCoinsIsLoading,
    selectCoinsError,
    selectSearchedFilteredCoins,
} from 'redux/selectors/coinsSelectors';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { TriangleSorter } from 'components/TriangleSorter/TriangleSorter';
import classnames from 'classnames';
import { FieldNameType } from 'types/coin';
import { CoinItem } from '../CoinItem/CoinItem';
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
    const error = useAppSelector(selectCoinsError);
    const [activeTriangle, setActiveTriangle] = useState<FieldNameType>('rank');

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
                    <th className={classes.colHeader}>
                        <div className={classes.headerItem}>
                            <span>#</span>
                            <TriangleSorter
                                sortField='rank'
                                activeTriangle={activeTriangle}
                                setActiveTriangle={setActiveTriangle}
                            />
                        </div>
                    </th>
                    <th className={classes.colHeader}>
                        <div className={classnames(classes.headerItem, classes.firstColumn)}>
                            <span>{t('Name')}</span>
                            <TriangleSorter
                                sortField='name'
                                activeTriangle={activeTriangle}
                                setActiveTriangle={setActiveTriangle}
                            />
                        </div>
                    </th>
                    <th className={classes.colHeader}>
                        <div className={classes.headerItem}>
                            <span>{t('Price')}</span>
                            <TriangleSorter
                                sortField='price'
                                activeTriangle={activeTriangle}
                                setActiveTriangle={setActiveTriangle}
                            />
                        </div>
                    </th>
                    <th className={classes.colHeader}>
                        <div className={classes.headerItem}>
                            <span>{t('Change')}</span>
                            <TriangleSorter
                                sortField='change'
                                activeTriangle={activeTriangle}
                                setActiveTriangle={setActiveTriangle}
                            />
                        </div>
                    </th>
                    <th className={classes.colHeader}>
                        <div className={classes.headerItem}>
                            <span>{t('24h volume')}</span>
                            <TriangleSorter
                                sortField='24hVolume'
                                activeTriangle={activeTriangle}
                                setActiveTriangle={setActiveTriangle}
                            />
                        </div>
                    </th>
                    <th className={classes.colHeader}>
                        <div className={classes.headerItem}>
                            <span>{t('Market cap')}</span>
                            <TriangleSorter
                                sortField='marketCap'
                                activeTriangle={activeTriangle}
                                setActiveTriangle={setActiveTriangle}
                            />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {searchedFilteredCoins
                    && (searchedFilteredCoins.map((coin) => (
                        <CoinItem
                            coin={coin}
                            key={coin.symbol}
                        />
                    )))}
            </tbody>
        </table>
    );
});
