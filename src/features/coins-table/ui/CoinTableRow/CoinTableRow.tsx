import { FC, memo, ReactElement, useEffect, useMemo, useState } from 'react';
import { useFormatter } from 'shared/hooks/useFormatter';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import {
	addWatchListCoin,
	removeWatchListCoin,
} from 'features/user/model/userActions';
import { userSelectors } from 'features/user/model/userSlice';
import { LoaderRing } from 'shared/UI/LoaderRing/LoaderRing';
import type { Coin } from 'shared/types/coin';

import StarIcon from '../../assets/star.svg';
import StarSelectedIcon from '../../assets/starSelected.svg';
import { coinsSelectors } from '../../model/coinsSlice';
import classes from './CoinTableRow.module.scss';

import classnames from 'classnames';

interface CoinTableRowProps {
	coin: Coin;
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
	const watchListIds = useAppSelector(userSelectors.selectUserWatchListIds);
	const isUserMounted = useAppSelector(userSelectors.selectUserMounted);
	const user = useAppSelector(userSelectors.selectUser);
	const priceNotation = useAppSelector(coinsSelectors.selectCoinsPriceNotation);
	const dispatch = useAppDispatch();
	
	const formatter = useFormatter({ currentCurrency: 'USD', notation: priceNotation });

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
