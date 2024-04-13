import {
    FC, memo, useCallback, useEffect, useState,
} from 'react';
import { ICoin } from 'types/coin';
import { useFormatter } from 'hooks/useFormatter';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { addWatchListCoin, removeWatchListCoin } from 'redux/actions/userActions';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { selectUser, selectUserWatchList } from 'redux/selectors/userSelectors';
import StarIcon from 'assets/icons/star.svg';
import StarSelectedIcon from 'assets/icons/starSelected.svg';

import classnames from 'classnames';
import classes from './CoinItem.module.scss';

interface CoinItemProps {
	coin: ICoin;
	className?: string;
}

export const CoinItem: FC<CoinItemProps> = memo((props) => {
    const { coin, className } = props;
    const [isInWatchList, setIsInWatchList] = useState<boolean>(false);
    const watchList = useAppSelector(selectUserWatchList);
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const formatter = useFormatter();

    useEffect(() => {
        watchList.forEach((item) => {
            if (item === coin.uuid) {
                setIsInWatchList(true);
            }
        });
    }, []);

    const onAddCoinToWatchList = useCallback(async () => {
        if (user) {
            const { meta, payload } = await dispatch(addWatchListCoin(coin.uuid));

            if (meta.requestStatus === 'fulfilled') {
                setIsInWatchList(true);
                localStorage.setItem(
                    USER_LOCALSTORAGE_KEY,
                    JSON.stringify({ ...user, watchList: [...watchList, payload] }),
                );
            }
        }
    }, [dispatch, user]);

    const onRemoveCoinFromWatchList = useCallback(async () => {
        const { meta } = await dispatch(removeWatchListCoin(coin.uuid));

        if (meta.requestStatus === 'fulfilled') {
            setIsInWatchList(false);
            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                JSON.stringify({ ...user, watchList: [...watchList.filter((id) => id !== coin.uuid)] }),
            );
        }
    }, [dispatch, watchList]);

    return (
        <tr className={classnames(classes.CoinItem, className)}>
            <th className={classes.rank}>{coin.rank}</th>
            <th className={classes.bigColumn}>
                <img
                    src={coin.iconUrl}
                    className={classes.icon}
                    alt={coin.symbol}
                />
                <div className={classes.name}>{coin.name}</div>
                <div className={classes.symbol}>{coin.symbol}</div>
            </th>
            <th>
                {formatter.format(Number(coin.price))}
            </th>
            <th className={coin.change.startsWith('-')
                ? classes.negative
                : classes.positive}
            >
                {coin.change}
                %
            </th>
            <th>
                {formatter.format(Number(coin['24hVolume']))}
            </th>
            <th>
                {formatter.format(Number(coin.marketCap))}
            </th>
            <th>
                {isInWatchList
                    ? (
                        <StarSelectedIcon
                            className={classes.starIconSelected}
                            onClick={onRemoveCoinFromWatchList}
                        />
                    )
                    : (
                        <StarIcon
                            className={classes.starIcon}
                            onClick={onAddCoinToWatchList}
                        />
                    )}
            </th>
        </tr>
    );
});
