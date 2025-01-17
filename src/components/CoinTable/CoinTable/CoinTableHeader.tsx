import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnToggleSort } from '../ColumnToggleSort/ColumnToggleSort';
import { FieldNameType } from 'types/coin';
import { useSearchParams } from 'react-router-dom';
import { SortField } from 'constants/sort';

import classnames from 'classnames';
import classes from './CoinTable.module.scss';

interface CoinTableHeaderProps {
	className?: string;
}

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
						<ColumnToggleSort
							sortField={SortField.rank}
							activeTriangle={activeTriangle}
							setActiveTriangle={setActiveTriangle}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>{t('Name')}</span>
						<ColumnToggleSort
							sortField={SortField.name}
							activeTriangle={activeTriangle}
							setActiveTriangle={setActiveTriangle}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>{t('Price')}</span>
						<ColumnToggleSort
							sortField={SortField.price}
							activeTriangle={activeTriangle}
							setActiveTriangle={setActiveTriangle}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>{t('Change')}</span>
						<ColumnToggleSort
							sortField={SortField.change}
							activeTriangle={activeTriangle}
							setActiveTriangle={setActiveTriangle}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>{t('24h volume')}</span>
						<ColumnToggleSort
							sortField={SortField['24hVolume']}
							activeTriangle={activeTriangle}
							setActiveTriangle={setActiveTriangle}
						/>
					</div>
				</th>
				<th className={classes.colHeader} colSpan={-1}>
					<div className={classes.headerItem}>
						<span>{t('Market cap')}</span>
						<ColumnToggleSort
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
