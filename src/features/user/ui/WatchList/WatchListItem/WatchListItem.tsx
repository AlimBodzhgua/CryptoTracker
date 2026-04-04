import type { FC } from 'react';
import type { Coin } from 'shared/types/coin';

import { useState, memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'shared/UI/Button/Button';
import { useAppDispatch } from 'shared/hooks/redux';
import { SortableItem } from 'shared/lib/components/SortableItem';
import classnames from 'classnames';
import { useFormatter } from 'shared/hooks/useFormatter';

import { removeWatchListCoin } from '../../../model/userActions';
import { WatchListItemModal } from '../WatchListItemModal/WatchListItemModal';
import StarSelectedIcon from '../../../assets/starSelected.svg';
import InfoIcon from '../../../assets/info.svg';
import classes from './WatchListItem.module.scss';

interface WatchListItemProps {
	coin: Coin;
	className?: string;
}

export const WatchListItem: FC<WatchListItemProps> = memo((props) => {
	const { coin, className } = props;
	const [isOverviewModal, setIsOverviewModal] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [_, setSearchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const formatter = useFormatter({ currentCurrency: 'USD', notation: 'standard' });
	

	const onRemoveFromWatchList = async () => {
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
		<SortableItem id={coin.uuid} className={classes.WatchListItemWrapper}>
			<li
				className={classnames(classes.WatchListItem, className, {
					[classes.deleting]: isLoading,
				})}
			>
				<div className={classes.itemData}>
					<img src={coin.iconUrl} alt={coin.symbol} className={classes.icon} />
					<div className={classes.itemDetails}>
						<div className={classes.name}>{coin.name}</div>
						<div className={classes.symbol}>{coin.symbol}</div>
					</div>
					<div className={classes.priceInfo}>
						<div className={classes.price}>{formatter.format(Number(coin.price))}</div>
						<div
							className={classnames(
								classes.change,
								coin.change?.startsWith('-') ? classes.negative : classes.positive,
							)}
						>
							{coin.change}
						</div>
					</div>
				</div>
				<div className={classes.itemActions}>
					<Button
						theme='primary'
						size='sm'
						onClick={onOpenOverviewModal}
						className={classes.overviewBtn}
					>
						<InfoIcon className={classes.overviewIcon} />
					</Button>
					<WatchListItemModal
						coin={coin}
						isOpen={isOverviewModal}
						onClose={onCloseOverviewModal}
					/>
					<Button theme='clear' size='sm' onClick={onRemoveFromWatchList}>
						<StarSelectedIcon className={classes.starIcon} />
					</Button>
					<Button theme='clear' className={classes.dragHandleBtn}>
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
