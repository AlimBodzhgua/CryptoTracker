import { FC, memo, ReactElement, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { LoaderRing } from 'shared/UI/LoaderRing/LoaderRing';

import type { WatchlistState } from '../../model/types';
import { addWatchListCoin, removeWatchListCoin } from '../../model/userActions';
import { userSelectors } from '../../model/userSlice';
import StarSelectedIcon from '../../assets/starSelected.svg';
import StarIcon from '../../assets/star.svg';
import classes from './AddToWatchListButton.module.scss';

interface AddToWatchListButtonProps {
	coinId: string;
}

export const AddToWatchListButton:FC<AddToWatchListButtonProps> = memo((props) => {
	const { coinId } = props;
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isInWatchList, setIsInWatchList] = useState<boolean>(false);
	const user = useAppSelector(userSelectors.selectUser);
	const isUserMounted = useAppSelector(userSelectors.selectUserMounted);
	const watchListIds = useAppSelector(userSelectors.selectUserWatchListIds);

	useEffect(() => {
		if (isUserMounted) {
			const isWatched = watchListIds.includes(coinId)
			setIsInWatchList(isWatched);
		}
	}, [isUserMounted]);

	const onAddCoinToWatchList = async () => {
		if (user) {
			setIsLoading(true);
			const { meta } = await dispatch(addWatchListCoin(coinId));

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
		const { meta } = await dispatch(removeWatchListCoin(coinId));

		if (meta.requestStatus === 'fulfilled') {
			setIsInWatchList(false);
			setIsLoading(false);
		} else if (meta.requestStatus === 'rejected') {
			setIsLoading(false);
		}
	};

	const mapToMatchedIcon = useMemo<Record<WatchlistState, ReactElement>>(() => ({
		selected: (
			<StarSelectedIcon
				role='button'
				onClick={onRemoveCoinFromWatchList}
				className={classes.starIconSelected}
			/>
		),
		unselected: (
			<StarIcon
				role='button'
				onClick={onAddCoinToWatchList}
				className={classes.starIcon}
			/>
		),
	}), [onRemoveCoinFromWatchList, onAddCoinToWatchList]);


	return (
		<>
			{isLoading ? (
				<LoaderRing className={classes.loader} />
			) : (
				mapToMatchedIcon[isInWatchList ? 'selected' : 'unselected']
			)}
		</>
	);
});