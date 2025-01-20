import { FC, memo, ReactElement, useEffect, useMemo, useState } from 'react';
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
import type { ICoin } from 'types/coin';

import StarIcon from 'assets/icons/star.svg';
import StarSelectedIcon from 'assets/icons/starSelected.svg';

import classnames from 'classnames';
import classes from './CoinTableRow.module.scss';

interface CoinTableRowProps {
	coin: ICoin;
	className?: string;
}

type SelectionType = 'selected' | 'unselected';

export const CoinTableRow: FC<CoinTableRowProps> = memo((props) => {
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
			const find = watchListIds.find((id) => id === coin.uuid);
			setIsInWatchList(!!find);
		}
	}, [isUserMounted]);

	const onAddCoinToWatchList = async () => {
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
	};

	const onRemoveCoinFromWatchList = async () => {
		setIsLoading(true);
		const { meta } = await dispatch(removeWatchListCoin(coin.uuid));

		if (meta.requestStatus === 'fulfilled') {
			setIsInWatchList(false);
			setIsLoading(false);
		} else if (meta.requestStatus === 'rejected') {
			setIsLoading(false);
		}
	};

	const mapToMatchedIcon = useMemo<Record<SelectionType, ReactElement>>(() => ({
		selected: (
			<StarSelectedIcon className={classes.starIconSelected} onClick={onRemoveCoinFromWatchList} />
		),
		unselected: (
			<StarIcon className={classes.starIcon} onClick={onAddCoinToWatchList} />
		),
	}), [onRemoveCoinFromWatchList, onAddCoinToWatchList]);

	return (
		<tr className={classnames(classes.CoinTableRow, className)}>
			<td className={classes.rank}>{coin.rank}</td>
			<td className={classes.bigColumn}>
				<img src={coin.iconUrl} className={classes.icon} alt={coin.symbol} />
				<div className={classes.name}>{coin.name}</div>
				<div className={classes.symbol}>{coin.symbol}</div>
			</td>
			<td>{formatter.format(Number(coin.price))}</td>
			<td className={coin.change?.startsWith('-') ? classes.negative : classes.positive}>
				{coin.change ? `${coin.change}%` : '-'}
			</td>
			<td>{formatter.format(Number(coin['24hVolume']))}</td>
			<td>{formatter.format(Number(coin.marketCap))}</td>
			<td>
				{isLoading ? (
					<LoaderRing className={classes.loader} />
				) : (
					mapToMatchedIcon[isInWatchList ? 'selected' : 'unselected']
				)}
			</td>
		</tr>
	);
});
