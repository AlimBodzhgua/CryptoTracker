import { FC, useState, memo, useCallback } from 'react';
import { ICoin } from 'types/coin';
import { Button } from 'components/UI/Button/Button';
import { useAppDispatch } from 'hooks/redux';
import { removeWatchListCoin } from 'store/actions/userActions';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { SortableItem } from 'lib/components/SortableItem';
import StarSelectedIcon from 'assets/icons/starSelected.svg';
import InfoIcon from 'assets/icons/info.svg';
import classnames from 'classnames';

import { WatchListItemModal } from '../WatchListItemModal/WatchListItemModal';
import classes from './WatchListItem.module.scss';

interface WatchListItemProps {
	coin: ICoin;
	className?: string;
}

export const WatchListItem: FC<WatchListItemProps> = memo((props) => {
	const { coin, className } = props;
	const { t } = useTranslation();
	const [isOverviewModal, setIsOverviewModal] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [_, setSearchParams] = useSearchParams();
	const dispatch = useAppDispatch();

	const onRemoveFromWatchList = async() => {
		setIsLoading(true);
		const { meta } = await dispatch(removeWatchListCoin(coin.uuid));

		if (meta.requestStatus === 'fulfilled' || meta.requestStatus === 'rejected') {
			setIsLoading(false);
		}
	};

	const onOpenOverviewModal = useCallback(() => {
		setIsOverviewModal(true);
		setSearchParams({ modal: 'overview' });
	}, []);

	const onCloseOverviewModal = useCallback(() => {
		setIsOverviewModal(false);
		setSearchParams('');
	}, []);

	return (
		<SortableItem id={coin.uuid}>
			<li
				className={classnames(classes.WatchListItem, className, {
					[classes.deleting]: isLoading,
				})}
			>
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
						theme='primary'
						size='small'
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
						theme='clear'
						onClick={onRemoveFromWatchList}
					>
						<StarSelectedIcon className={classes.starIcon} />
					</Button>
					<Button
						theme='clear'
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
});
