import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TriangleSorter } from 'components/TriangleSorter/TriangleSorter';
import { FieldNameType } from 'types/coin';
import { useSearchParams } from 'react-router-dom';

import classnames from 'classnames';
import classes from './CoinTable.module.scss';

interface CoinTableHeaderProps {
	className?: string;
}

const SortField = {
	rank: 'rank',
	name: 'name',
	price: 'price',
	change: 'change',
	'24hVolume': '24hVolume',
	marketCap: 'marketCap',
} as const;

export const CoinTableHeader: FC<CoinTableHeaderProps> = ({ className }) => {
	const { t } = useTranslation();
	const [activeTriangle, setActiveTriangle] = useState<FieldNameType>(SortField.rank);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		if (searchParams.has('field')) {
			const fieldValues: string[] = Object.values(SortField);
			const paramFieldValue = searchParams.get('field');

			if (fieldValues.includes(paramFieldValue!)) {
				setActiveTriangle(paramFieldValue as FieldNameType);
			} else {
				throw Error('Such url does not exist');
			}
		}
	}, []);

	return (
		<thead className={classnames(classes.header, className)}>
			<tr className={classes.row}>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>#</span>
						<TriangleSorter
							sortField={SortField.rank}
							activeTriangle={activeTriangle}
							setActiveTriangle={setActiveTriangle}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<div
						className={classnames(
							classes.headerItem,
							classes.firstColumn,
						)}
					>
						<span>{t('Name')}</span>
						<TriangleSorter
							sortField={SortField.name}
							activeTriangle={activeTriangle}
							setActiveTriangle={setActiveTriangle}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>{t('Price')}</span>
						<TriangleSorter
							sortField={SortField.price}
							activeTriangle={activeTriangle}
							setActiveTriangle={setActiveTriangle}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>{t('Change')}</span>
						<TriangleSorter
							sortField={SortField.change}
							activeTriangle={activeTriangle}
							setActiveTriangle={setActiveTriangle}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>{t('24h volume')}</span>
						<TriangleSorter
							sortField={SortField['24hVolume']}
							activeTriangle={activeTriangle}
							setActiveTriangle={setActiveTriangle}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>{t('Market cap')}</span>
						<TriangleSorter
							sortField={SortField.marketCap}
							activeTriangle={activeTriangle}
							setActiveTriangle={setActiveTriangle}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>{t('Actions')}</span>
					</div>
				</th>
			</tr>
		</thead>
	);
};