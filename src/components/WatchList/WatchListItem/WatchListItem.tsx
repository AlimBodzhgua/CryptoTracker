import { FC } from 'react';
import { ICoin } from 'types/coin';
import { Button, ButtonTheme } from 'components/UI/Button/Button';
import { useAppDispatch } from 'hooks/redux';
import { removeWatchListCoin } from 'redux/actions/userActions';
import { SortableItem } from 'components/SortableItem/SortableItem';

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

    const onRemoveFromWatchList = async () => {
        dispatch(removeWatchListCoin(coin.uuid));
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
