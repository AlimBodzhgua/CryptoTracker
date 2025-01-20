import { FC, memo } from 'react';
import { Skeleton } from 'components/UI/Skeleton/Skeleton';

import classnames from 'classnames';
import classes from './CoinTable.module.scss';
import { useTranslation } from 'react-i18next';

interface CoinTableSkeletonProps {
	withHeader: boolean;
	className?: string;
}

export const CoinTableSkeleton: FC<CoinTableSkeletonProps> = memo((props) => {
	const { withHeader, className } = props;
	const { t } = useTranslation();

	return (
		<table
			className={classnames(classes.table, className, classes.loading)}
		>
			{withHeader && (
				<thead className={classes.header}>
					<tr className={classes.row}>
						<th className={classes.colHeader}>
							<div>
								<span>#</span>
							</div>
						</th>
						<th className={classes.colHeader}>
							<div className={classes.headerItem}>
								<span>{t('Name')}</span>
							</div>
						</th>
						<th className={classes.colHeader}>
							<div className={classes.headerItem}>
								<span>{t('Price')}</span>
							</div>
						</th>
						<th className={classes.colHeader}>
							<div className={classes.headerItem}>
								<span>{t('Change')}</span>
							</div>
						</th>
						<th className={classes.colHeader}>
							<div className={classes.headerItem}>
								<span>{t('24h volume')}</span>
							</div>
						</th>
						<th className={classes.colHeader} colSpan={-1}>
							<div className={classes.headerItem}>
								<span>{t('Market cap')}</span>
							</div>
						</th>
						<th className={classes.colHeader}>
							<div className={classes.headerItem}>
								<span>{t('Actions')}</span>
							</div>
						</th>
					</tr>
				</thead>
			)}
			<tbody>
				{new Array(12).fill(0).map((_, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<tr key={index} className={classes.loadingRow}>
						<td key={index}>
							<Skeleton width={30} height={25} radius='5px' />
						</td>
						{new Array(5).fill(0).map((_, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<td key={index}>
								<Skeleton width={150} height={25} radius='5px' />
							</td>
						))}
						<td key={index}>
							<Skeleton width={35} height={25} radius='5px' />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
});
