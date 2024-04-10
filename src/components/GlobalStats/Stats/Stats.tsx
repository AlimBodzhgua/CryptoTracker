import { FC, memo } from 'react';
import { useAppSelector } from 'hooks/redux';
import {
    selectCoinsIsLoading,
    selectCoinsGlobalStats,
    selectCoinsError,
    selectCoinsGlobalStatsData,
} from 'redux/selectors/coinsSelectors';
import { Message } from 'components/UI/Message/Message';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { StatsSkeleton } from './StatsSkeleton';
import { List } from '../List/List';

import classes from './Stats.module.scss';

interface StatsProps {
	className?: string;
}

export const Stats: FC<StatsProps> = memo(({ className }) => {
    const { t } = useTranslation();
    const stats = useAppSelector(selectCoinsGlobalStats);
    const statsData = useAppSelector(selectCoinsGlobalStatsData);
    const isLoading = useAppSelector(selectCoinsIsLoading);
    const error = useAppSelector(selectCoinsError);

    if (error) {
        return (
            <div className={classes.Stats}>
                <Message
                    type='error'
                    text='Error fetching global stats, try to reload the page'
                    withIcon
                />
            </div>
        );
    }

    if (isLoading) {
        return <StatsSkeleton />;
    }

    return (
        <div className={classnames(classes.Stats, className)}>
            {statsData.map((data) => (
                <div className={classes.data} key={data.value}>
                    <div className={classes.dataTitle}>
                        {t(`${data.title}`)}
                    </div>
                    <div className={classes.dataValue}>{data.value}</div>
                </div>
            ))}
            <div className={classes.listSection}>
                {stats && (
                    <>
                        <div className={classes.listWrapper}>
                            <h3 className={classes.listTitle}>
                                {t('Best performing coins')}
                            </h3>
                            <List coins={stats.bestCoins} />
                        </div>
                        <div className={classes.listWrapper}>
                            <h3 className={classes.listTitle}>
                                {t('Newest coins')}
                            </h3>
                            <List coins={stats.newestCoins} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});
