import { FC, useState } from 'react';
import { ICoin } from 'types/coin';
import { Button, ButtonSize, ButtonTheme } from 'components/UI/Button/Button';
import { useAppDispatch } from 'hooks/redux';
import { removeWatchListCoin } from 'redux/actions/userActions';
import { SortableItem } from 'components/SortableItem/SortableItem';
import { WatchListItemModal } from '../WatchListItemModal/WatchListItemModal';
import { useTranslation } from 'react-i18next';

import StarSelectedIcon from 'assets/icons/starSelected.svg';
import InfoIcon from 'assets/icons/info.svg';

import classnames from 'classnames';
import classes from './WatchListItem.module.scss';

interface WatchListItemProps {
	coin: ICoin;
	className?: string;
}

export const WatchListItem: FC<WatchListItemProps> = (props) => {
    const { coin, className } = props;
    const { t } = useTranslation();
    const [isOverviewModal, setIsOverviewModal] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onRemoveFromWatchList = async () => {
        dispatch(removeWatchListCoin(coin.uuid));
    };

    const onOpenOverviewModal = () => {
        setIsOverviewModal(true)
    }

    const onCloseOverviewModal = () => {
        setIsOverviewModal(false)
    }

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
                        theme={ButtonTheme.primary}
                        size={ButtonSize.small}
                        onClick={onOpenOverviewModal}
                        className={classes.infoBtn}
                    >
                        <InfoIcon className={classes.infoIcon} />
                        <div>{t('overview')}</div>
                    </Button>
                    <WatchListItemModal
                        coin={coin}
                        isOpen={isOverviewModal}
                        onClose={onCloseOverviewModal}
                    />
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
