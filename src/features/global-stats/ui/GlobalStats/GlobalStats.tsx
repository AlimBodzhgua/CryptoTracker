import { FC, memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { useTranslation } from 'react-i18next';
import { useFormatter } from 'shared/hooks/useFormatter';
import { CurrencyType } from 'shared/types/coin';
import { Message } from 'shared/UI/Message/Message';
import classnames from 'classnames';

import { fetchGlobalStats } from '../../model/actions';
import { globalStatsSelectors } from '../../model/globalStatsSlice';
import { List } from '../List/List';
import { GlobalStatsSkeleton } from './GlobalStatsSkeleton';

import classes from './GlobalStats.module.scss';

interface StatsProps {
	className?: string;
	currentCurrency: CurrencyType;
}

export const GlobalStats: FC<StatsProps> = memo((props) => {
	const { className, currentCurrency } = props;
	const { t } = useTranslation();
	const stats = useAppSelector(globalStatsSelectors.selectGlobalStats);
	const statsData = useAppSelector(globalStatsSelectors.selectCoinsGlobalStatsData);
	const isLoading = useAppSelector(globalStatsSelectors.selectGlobalStatsIsLoading);
	const error = useAppSelector(globalStatsSelectors.selectGlobalStatsError);
	const formatter = useFormatter({ currentCurrency, notation: 'standard' });
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			dispatch(fetchGlobalStats());
		}
	}, [dispatch]);


	if (isLoading) {
		return <GlobalStatsSkeleton />;
	}

	if (error) {
		return (
			<Message
				type='error'
				text='Error fetching global stats, try to reload the page'
				withIcon
			/>
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
