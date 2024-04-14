import { FC } from 'react';
import { Skeleton } from 'components/UI/Skeleton/Skeleton';
import { useTranslation } from 'react-i18next';

import classnames from 'classnames';
import classes from './WatchList.module.scss';

interface WatchListSkeletonProps {
	className?: string;
}

export const WatchListSkeleton: FC<WatchListSkeletonProps> = ({ className }) => {
    const { t } = useTranslation();

    return (
        <ul className={classnames(classes.WatchList, className)}>
            <h2 className={classes.title}>{t('Your watchlist Coins.')}</h2>
            {Array(12).fill(0).map((_, index) => (
                <Skeleton
                    width='100%'
                    height='35px'
                    radius='5px'
                    // eslint-disable-next-line
                    key={index}
                    className={classes.listSkeleton}
                />
            ))}
        </ul>
    );
};
