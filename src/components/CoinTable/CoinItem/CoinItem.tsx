import { FC, memo, useCallback, useEffect, useState } from 'react';
import { ICoin } from 'types/coin';
import { useFormatter } from 'hooks/useFormatter';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
	addWatchListCoin,
	removeWatchListCoin,
} from 'store/actions/userActions';
import {
	selectUser,
	selectUserMounted,
	selectUserWatchListIds,
} from 'store/selectors/userSelectors';
import { LoaderRing } from 'components/UI/LoaderRing/LoaderRing';

import StarIcon from 'assets/icons/star.svg';
import StarSelectedIcon from 'assets/icons/starSelected.svg';

import classnames from 'classnames';
import classes from './CoinItem.module.scss';

interface CoinItemProps {
	coin: ICoin;
	className?: string;
}

export const CoinItem: FC<CoinItemProps> = memo((props) => {
	const {
		coin,
		className,
	} = props;
	const [isInWatchList, setIsInWatchList] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const watchListIds = useAppSelector(selectUserWatchListIds);
	const user = useAppSelector(selectUser);
	const isUserMounted = useAppSelector(selectUserMounted);
	const dispatch = useAppDispatch();
	const formatter = useFormatter();

	useEffect(() => {
		if (isUserMounted) {
			watchListIds.forEach((item) => {
				if (item === coin.uuid) {
					setIsInWatchList(true);
				}
			});
		}
	}, [isUserMounted]);

	const onAddCoinToWatchList = useCallback(async () => {
		if (user) {
			setIsLoading(true);
			const { meta } = await dispatch(addWatchListCoin(coin.uuid));

			if (meta.requestStatus === 'fulfilled') {
				setIsLoading(false);
				setIsInWatchList(true);
			} else if (meta.requestStatus === 'rejected') {
				setIsLoading(false);
			}
		}
	}, [dispatch, user]);

	const onRemoveCoinFromWatchList = useCallback(async () => {
		setIsLoading(true);
		const { meta } = await dispatch(removeWatchListCoin(coin.uuid));

		if (meta.requestStatus === 'fulfilled') {
			setIsInWatchList(false);
			setIsLoading(false);
		} else if (meta.requestStatus === 'rejected') {
			setIsLoading(false);
		}
	}, [dispatch, watchListIds]);

	const renderWatchListAction = useCallback(() => (
		isInWatchList ? (
			<StarSelectedIcon
				className={classes.starIconSelected}
				onClick={onRemoveCoinFromWatchList}
			/>
		) : (
			<StarIcon
				className={classes.starIcon}
				onClick={onAddCoinToWatchList}
			/>
		)
	), [isInWatchList, onRemoveCoinFromWatchList, onAddCoinToWatchList]);

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
			<th>{formatter.format(Number(coin.price))}</th>
			<th
				className={
					coin.change.startsWith('-')
						? classes.negative
						: classes.positive
				}
			>
				{coin.change}%
			</th>
			<th>{formatter.format(Number(coin['24hVolume']))}</th>
			<th>{formatter.format(Number(coin.marketCap))}</th>
			<th>
				{isLoading ? (
					<LoaderRing className={classes.loader} />
				) : (
					renderWatchListAction()
				)}
			</th>
		</tr>
	);
});
