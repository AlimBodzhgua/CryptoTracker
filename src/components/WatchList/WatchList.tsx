import {
    FC, memo, useCallback, useMemo,
} from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { Message } from 'components/UI/Message/Message';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, ButtonTheme } from 'components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import {
    DndContext,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { userActions } from 'redux/slices/userSlice';
import {
    selectUserError,
    selectUserIsLoading,
    selectUserWatchListCoins,
} from 'redux/selectors/userSelectors';
import { updateWatchList } from 'redux/actions/userActions';
import StarIcon from 'assets/icons/starSelected.svg';
import classnames from 'classnames';
import { WatchListSkeleton } from './WatchListSkeleton';
import { WatchListItem } from './WatchListItem/WatchListItem';

import classes from './WatchList.module.scss';

interface WatchListProps {
	className?: string;
}

export const WatchList: FC<WatchListProps> = memo(({ className }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const watchListCoins = useAppSelector(selectUserWatchListCoins);
    const isLoading = useAppSelector(selectUserIsLoading);
    const error = useAppSelector(selectUserError);
    const navigate = useNavigate();
    const [searchParams, _] = useSearchParams();

    const dragDisabled = useMemo(
        () => (!!searchParams.has('modal')),
        [searchParams],
    );

    const onNavigateToCoinsPage = () => {
        navigate('/coins');
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    const onWatchlistDragEnd = useCallback((e: DragEndEvent) => {
        const { active, over } = e;
        if (active.id !== over!.id) {
            dispatch(userActions.moveWatchList({
                activeId: String(active.id),
                overId: String(over!.id),
            }));
            dispatch(updateWatchList());
        }
    }, [dispatch]);

    if (isLoading) {
        return <WatchListSkeleton />;
    }

    if (error) {
        return (
            <Message
                type='error'
                text={t('Error fetcthing watchlist coins')}
                withIcon
            />
        );
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
                <ul className={classnames(classes.WatchList, className)}>
                    {watchListCoins.length
                        ? (
                            <>
                                <h2 className={classes.title}>{t('Your watchlist coins')}</h2>
                                {watchListCoins.map((coin) => <WatchListItem coin={coin} key={coin.uuid} />)}
                            </>
                        ) : (
                            <div className={classes.emptyMessage}>
                                <div className={classes.iconWrapper}>
                                    <StarIcon className={classes.starIcon} />
                                </div>
                                <h3 className={classes.emptyTitle}>
                                    {t('Your watchlist is empty.')}
                                </h3>
                                <h4 className={classes.emptySubtitle}>
                                    {t('You can add coins to watchlist on coins page.')}
                                </h4>
                                <Button
                                    onClick={onNavigateToCoinsPage}
                                    theme={ButtonTheme.secondary}
                                >
                                    {t('Add coins')}
                                </Button>
                            </div>
                        )}
                </ul>
            </SortableContext>
        </DndContext>
    );
});
