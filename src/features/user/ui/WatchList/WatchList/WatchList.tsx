import type { FC } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';

import { memo, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'shared/hooks/redux';
import { Message } from 'shared/UI/Message/Message';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'shared/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import classnames from 'classnames';
import { fetchWatchListCoins, updateWatchList } from '../../../model/userActions';
import { userSelectors, userActions } from '../../../model/userSlice';

import { WatchListItem } from '../WatchListItem/WatchListItem';
import { WatchListSkeleton } from './WatchListSkeleton';

import SelectedStarIcon from '../../../assets/starSelected.svg';
import StarIcon from '../../../assets/star.svg'
import classes from './WatchList.module.scss';

interface WatchListProps {
	className?: string;
}

export const WatchList: FC<WatchListProps> = memo(({ className }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const watchListCoins = useAppSelector(userSelectors.selectUserWatchListCoins);
	const isLoading = useAppSelector(userSelectors.selectUserIsLoading);
	const error = useAppSelector(userSelectors.selectUserError);
	const userMounted = useAppSelector(userSelectors.selectUserMounted);
	const navigate = useNavigate();
	const [searchParams, _] = useSearchParams();
	const dragDisabled = !!searchParams.has('modal');

	useEffect(() => {
		if (__PROJECT__ !== 'storybook' && userMounted) {
			dispatch(fetchWatchListCoins());
		}
	}, [dispatch, userMounted]);

	const onNavigateToCoinsPage = () => navigate('/coins');

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	const onWatchlistDragEnd = (e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id !== over!.id) {
			dispatch(userActions.moveWatchList({
				activeId: String(active.id),
				overId: String(over!.id),
			}));
			dispatch(updateWatchList());
		}
	};

	if (isLoading) {
		return <WatchListSkeleton />;
	}

	if (error) {
		return <Message type='error' text={t('watchlist.error')} withIcon />;
	}

	return (
		<DndContext
			sensors={sensors}
			modifiers={[restrictToParentElement]}
			onDragEnd={onWatchlistDragEnd}
		>
			<SortableContext
				items={watchListCoins.map((item) => item.uuid)}
				disabled={dragDisabled}
			>
					{watchListCoins.length ? (
						<>
							<div className={classes.header}>
								<StarIcon className={classes.icon}/>
								<h2 className={classes.title}>
									{t('watchlist.title')}
								</h2>
							</div>
							<ul className={classnames(classes.WatchList, className)}>
								{watchListCoins.map((coin) => (
									<WatchListItem coin={coin} key={coin.uuid} />
								))}
							</ul>
						</>
					) : (
						<div className={classes.emptyMessage}>
							<div className={classes.iconWrapper}>
								<SelectedStarIcon className={classes.starIcon} />
							</div>
							<h3 className={classes.emptyTitle}>
								{t('watchlist.empty')}
							</h3>
							<h4 className={classes.emptySubtitle}>
								{t('watchlist.empty_description')}
							</h4>
							<Button
								onClick={onNavigateToCoinsPage}
								theme='secondary'
							>
								{t('buttons.add_coins')}
							</Button>
						</div>
					)}
			</SortableContext>
		</DndContext>
	);
});
