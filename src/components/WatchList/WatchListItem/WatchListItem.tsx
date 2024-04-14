import { FC } from 'react';
import { ICoin } from 'types/coin';
import { Button, ButtonTheme } from 'components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { removeWatchListCoin } from 'redux/actions/userActions';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { SortableItem } from 'components/SortableItem/SortableItem';
import {
    selectUser,
    selectUserWatchListCoins,
    selectUserWatchListIds,
} from 'redux/selectors/userSelectors';

import StarSelectedIcon from 'assets/icons/starSelected.svg';

import classnames from 'classnames';
import classes from './WatchListItem.module.scss';

interface WatchListItemProps {
	coin: ICoin;
	className?: string;
}

export const WatchListItem: FC<WatchListItemProps> = (props) => {
    const { coin, className } = props;
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const watchListIds = useAppSelector(selectUserWatchListIds);
    const watchListCoins = useAppSelector(selectUserWatchListCoins);

    const onRemoveFromWatchList = async () => {
        const { meta } = await dispatch(removeWatchListCoin(coin.uuid));

        if (meta.requestStatus === 'fulfilled') {
            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                JSON.stringify({
                    ...user,
                    watchList: {
                        ids: [...watchListIds.filter((id) => id !== coin.uuid)],
                        coins: watchListCoins,
                    },
                }),
            );
        }
    };

    return (
        <SortableItem id={coin.uuid}>
            <li className={classnames(classes.WatchListItem, className)}>
                <div className={classes.itemData}>
                    <img
                        src={coin.iconUrl}
                        alt={coin.symbol}
                        className={classes.icon}
                    />
                    <div className={classes.name}>{coin.name}</div>
                    <div className={classes.symbol}>{coin.symbol}</div>
                </div>
                <div className={classes.itemActions}>
                    <Button
                        theme={ButtonTheme.clear}
                        onClick={onRemoveFromWatchList}
                    >
                        <StarSelectedIcon className={classes.starIcon} />
                    </Button>
                    <Button
                        theme={ButtonTheme.clear}
                        className={classes.dndBtn}
                    >
                        <span>&#x2022;</span>
                        <span>&#x2022;</span>
                        <span>&#x2022;</span>
                        <span>&#x2022;</span>
                        <span>&#x2022;</span>
                        <span>&#x2022;</span>
                    </Button>
                </div>
            </li>
        </SortableItem>
    );
};
