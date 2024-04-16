import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    selectCoinsIsLoading,
    selectCoinsError,
    selectSearchedFilteredCoins,
    selectCoinsPageNumber,
} from 'redux/selectors/coinsSelectors';
import { useAppSelector } from 'hooks/redux';
import { Message } from 'components/UI/Message/Message';
import { CoinItem } from '../CoinItem/CoinItem';
import { CoinTableHeader } from './CoinTableHeader';
import { CoinTableSkeleton } from './CoinTableSkeleton';

import classnames from 'classnames';
import classes from './CoinTable.module.scss';

interface CoinTableProps {
	className?: string;
}

export const CoinTable: FC<CoinTableProps> = memo(({ className }) => {
    const { t } = useTranslation();
    const searchedFilteredCoins = useAppSelector(selectSearchedFilteredCoins);
    const isLoading = useAppSelector(selectCoinsIsLoading);
    const page = useAppSelector(selectCoinsPageNumber);
    const error = useAppSelector(selectCoinsError);

    const withHeader = useMemo(() => page === 0, [page]);

    if (error) {
        return (
            <Message
                type="error"
                text={t(
                    "Error fetching data, try to reload the page, or visiti the page later",
                )}
                withIcon
            />
        );
    }

    return (
        <>
            <table className={classnames(classes.table, className)}>
                {searchedFilteredCoins.length ? (
                    <>
                        <CoinTableHeader />
                        <tbody>
                            {searchedFilteredCoins.map((coin) => (
                                <CoinItem coin={coin} key={coin.uuid}/>
                            ))}
                        </tbody>
                    </>
                ) : null}
            </table>
            {isLoading && (
                <CoinTableSkeleton
                    withHeader={withHeader}
                    className={classes.tableSkeleton}
                />
            )}
        </>
    );
});