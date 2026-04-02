import type { FC } from 'react';
import type { CurrencyType } from 'shared/types/coin';

import {  memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { useTranslation } from 'react-i18next';
import { useFormatter } from 'shared/hooks/useFormatter';
import { Message } from 'shared/UI/Message/Message';
import classnames from 'classnames';

import { fetchGlobalStats } from '../../model/actions';
import { globalStatsSelectors } from '../../model/globalStatsSlice';
import { CoinsList } from '../CoinsList/CoinsList';
import ClockIcon from './../../assets/clock.svg'
import FireIcon from './../../assets/fire.svg'

import { GlobalStatsSkeleton } from './GlobalStatsSkeleton';
import classes from './GlobalStats.module.scss';

interface StatsProps {
	className?: string;
	afterFetch?: () => void;
	currentCurrency: CurrencyType;
}

export const GlobalStats: FC<StatsProps> = memo((props) => {
	const { className, afterFetch, currentCurrency } = props;
	const { t } = useTranslation();
	const stats = useAppSelector(globalStatsSelectors.selectGlobalStats);
	const statsData = useAppSelector(globalStatsSelectors.selectCoinsGlobalStatsData);
	const isLoading = useAppSelector(globalStatsSelectors.selectGlobalStatsIsLoading);
	const error = useAppSelector(globalStatsSelectors.selectGlobalStatsError);
	const formatter = useFormatter({ currentCurrency, notation: 'standard' });
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (__PROJECT__ !== 'storybook') {
			dispatch(fetchGlobalStats()).then(() => {
				if (afterFetch) afterFetch();
			});
		}
	}, [dispatch]);

	if (isLoading) {
		return <GlobalStatsSkeleton />;
	}

	if (error) {
		return <Message type='error' text={t('market.error')} withIcon />;
	}

	return (
		<div className={classnames(classes.GlobalStats, className)}>

			<div className={classes.dataSection}>
				{statsData.map((data, index) => (
					<div className={classes.dataItem} key={crypto.randomUUID()}>
						<div className={classes.dataTitle}>
							{t(`${data.title}`)}
						</div>
						<div className={classes.dataValue}>
							{formatter.format(Number(data.value))}
						</div>
					</div>
				))}
			</div>

			<div className={classes.listSection}>
				{stats && (
					<>
						<div className={classes.listWrapper}>
							<div className={classes.listHeader}>
								<FireIcon />
								<h3 className={classes.listTitle}>
									{t('market.best_performing')}
								</h3>
							</div>
							<CoinsList coins={stats.bestCoins} />
						</div>

						<div className={classes.listWrapper}>
							<div className={classes.listHeader}>
								<ClockIcon />
								<h3 className={classes.listTitle}>
									{t('market.newest_coins')}
								</h3>
							</div>
							<CoinsList coins={stats.newestCoins} />
						</div>
					</>
				)}
			</div>
		</div>
	);
});
