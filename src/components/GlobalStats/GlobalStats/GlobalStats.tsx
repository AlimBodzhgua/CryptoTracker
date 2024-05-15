import { FC, memo } from 'react';
import { useAppSelector } from 'hooks/redux';
import {
	selectCoinsIsLoading,
	selectCoinsGlobalStats,
	selectCoinsError,
	selectCoinsGlobalStatsData,
} from 'store/selectors/coinsSelectors';
import { Message } from 'components/UI/Message/Message';
import { useTranslation } from 'react-i18next';
import { useFormatter } from 'hooks/useFormatter';
import classnames from 'classnames';
import { GlobalStatsSkeleton } from './GlobalStatsSkeleton';
import { List } from '../List/List';

import classes from './GlobalStats.module.scss';

interface StatsProps {
	className?: string;
}

export const GlobalStats: FC<StatsProps> = memo(({ className }) => {
	const { t } = useTranslation();
	const stats = useAppSelector(selectCoinsGlobalStats);
	const statsData = useAppSelector(selectCoinsGlobalStatsData);
	const isLoading = useAppSelector(selectCoinsIsLoading);
	const error = useAppSelector(selectCoinsError);
	const formatter = useFormatter();

	if (isLoading) {
		return <GlobalStatsSkeleton />;
	}

	if (error) {
		return (
			<div className={classes.Stats}>
				<Message
					type="error"
					text="Error fetching global stats, try to reload the page"
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
							: data.value}
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
