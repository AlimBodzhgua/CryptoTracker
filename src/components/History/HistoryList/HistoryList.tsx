import { FC, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonSize } from 'components/UI/Button/Button';
import {
    selectUserConversionHistory,
    selectUserError,
    selectUserIsLoading,
} from 'store/selectors/userSelectors';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { clearHistory } from 'store/actions/userActions';
import { Message } from 'components/UI/Message/Message';
import { Skeleton } from 'components/UI/Skeleton/Skeleton';
import classnames from 'classnames';
import { HistoryItem } from '../HistoryItem/HistoryItem';

import classes from './HistoryList.module.scss';

interface HistoryListProps {
	className?: string;
}

const HistoryList: FC<HistoryListProps> = memo(({ className }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const history = useAppSelector(selectUserConversionHistory);
    const isLoading = useAppSelector(selectUserIsLoading);
    const error = useAppSelector(selectUserError);

    const onClear = useCallback(async () => {
        dispatch(clearHistory());
    }, [dispatch]);

    const renderListSkeleton = useCallback(() => (
        new Array(3).fill(0).map((_, index) => (
            <Skeleton
                width='100%'
                height='50px'
                radius='4px'
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={classes.skeletonItem}
            />
        ))
    ), []);

    const renderHistoryContent = useCallback(() => {
        if (history.length) {
            return history.map((item) => <HistoryItem item={item} key={item.convertResult} />);
        }
        return (
            <h3 className={classes.emptyMsg}>
                {t('Convertasion list is empty')}
            </h3>
        );
    }, [history]);

    if (error) {
        return (
            <Message
                withIcon
                type='error'
                text={t('Error loading history, try to reload the page')}
            />
        );
    }

    return (
        <>
            <div className={classes.heaeder}>
                <h2 className={classes.title}>{t('Convertasion history')}</h2>
                <Button
                    className={classes.clearBtn}
                    size={ButtonSize.small}
                    onClick={onClear}
                    disabled={isLoading}
                >
                    {t('clear')}
                </Button>
            </div>
            <ul className={classnames(classes.HistoryList, className)}>
                {isLoading
                    ? <>{renderListSkeleton()}</>
                    : <>{renderHistoryContent()}</>}
            </ul>
        </>
    );
});

export default HistoryList;
