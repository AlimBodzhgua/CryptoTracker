import { FC, memo } from 'react';
import { Skeleton } from 'components/UI/Skeleton/Skeleton';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import classes from './CoinTable.module.scss';

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
							<span>{t('Name')}</span>
						</th>
						<th className={classes.colHeader}>
							<span>{t('Price')}</span>
						</th>
						<th className={classes.colHeader}>
							<span>{t('Change')}</span>
						</th>
						<th className={classes.colHeader}>
							<span>{t('24h volume')}</span>
						</th>
						<th className={classes.colHeader} colSpan={-1}>
							<span>{t('Market cap')}</span>
						</th>
						<th className={classes.colHeader}>
							<span>=</span>
						</th>
					</tr>
				</thead>
			)}
			<tbody>
				{new Array(12).fill(0).map((_, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<tr key={index} className={classes.loadingRow}>
						<td>
							<Skeleton width={30} height={25} radius='5px' />
						</td>
						{new Array(5).fill(0).map((_, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<td key={index}>
								<Skeleton width={150} height={25} radius='5px' />
							</td>
						))}
						<td>
							<Skeleton width={30} height={25} radius='5px' />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
});
