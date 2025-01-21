import { FC, memo, useCallback } from 'react';
import { Skeleton } from 'components/UI/Skeleton/Skeleton';
import { useTranslation } from 'react-i18next';
import classes from './GlobalStats.module.scss';

export const GlobalStatsSkeleton: FC = memo(() => {
	const { t } = useTranslation();

	const renderListSkeletons = useCallback(() => (
		Array(3).fill(0).map((_, index) => (
			<Skeleton
				// eslint-disable-next-line
				key={index}
				width='240px'
				height='32px'
				radius='6px'
				className={classes.listSkeleton}
			/>
		))
	), []);

	return (
		<div className={classes.Stats}>
			<div className={classes.data}>
				<div className={classes.dataTitle}>{t('Btc Dominance')}</div>
				<Skeleton width='140px' height='22px' radius='6px' />
			</div>
			<div className={classes.data}>
				<div className={classes.dataTitle}>{t('Total 24hVolume')}</div>
				<Skeleton width='140px' height='22px' radius='6px' />
			</div>
			<div className={classes.data}>
				<div className={classes.dataTitle}>{t('Total MarketCap')}</div>
				<Skeleton width='140px' height='22px' radius='6px' />
			</div>
			<div className={classes.data}>
				<div className={classes.dataTitle}>{t('Total Exchanges')}</div>
				<Skeleton width='140px' height='22px' radius='6px' />
			</div>
			<div className={classes.data}>
				<div className={classes.dataTitle}>{t('Total Markets')}</div>
				<Skeleton width='140px' height='22px' radius='6px' />
			</div>
			<div className={classes.data}>
				<div className={classes.dataTitle}>{t('Total Coins')}</div>
				<Skeleton width='140px' height='22px' radius='6px' />
			</div>
			<div className={classes.listSection}>
				<div className={classes.listWrapper}>
					<h3 className={classes.listTitle}>
						{t('Best performing coins')}
					</h3>
					{renderListSkeletons()}
				</div>
				<div className={classes.listWrapper}>
					<h3 className={classes.listTitle}>
						{t('Newest coins')}
					</h3>
					{renderListSkeletons()}
				</div>
			</div>
		</div>
	);
});
