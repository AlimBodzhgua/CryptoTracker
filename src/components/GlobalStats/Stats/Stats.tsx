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
import { StatsSkeleton } from './StatsSkeleton';
import { List } from '../List/List';
import { useFormatter } from 'hooks/useFormatter';

import classnames from 'classnames';
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
    const formatter = useFormatter()

    if (isLoading) {
        return <StatsSkeleton />;
    }

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

    return (
        <div className={classnames(classes.Stats, className)}>
            {statsData.map((data, index) => (
                <div className={classes.data} key={crypto.randomUUID()}>
                    <div className={classes.dataTitle}>
                        {t(`${data.title}`)}
                    </div>
                    <div className={classes.dataValue}>
                        {index <= 2
                            ? formatter.format(Number(data.value))
                            : data.value
                        }
                    </div>
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
