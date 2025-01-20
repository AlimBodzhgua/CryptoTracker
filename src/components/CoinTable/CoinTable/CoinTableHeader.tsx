import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldNameType, SortDirectionType } from 'types/coin';
import { useSearchParams } from 'react-router-dom';
import { SortField } from 'constants/sort';
import { coinsSorter } from 'utils/utils';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { coinsActions } from 'store/slices/coinsSlice';
import { selectCoins } from 'store/selectors/coinsSelectors';
import classnames from 'classnames';

import { ColumnToggleSort } from '../ColumnToggleSort/ColumnToggleSort';
import classes from './CoinTable.module.scss';

interface CoinTableHeaderProps {
	className?: string;
}

export const CoinTableHeader: FC<CoinTableHeaderProps> = ({ className }) => {
	const { t } = useTranslation();
	const [activeField, setActiveField] = useState<FieldNameType>(SortField.rank);
	const coins = useAppSelector(selectCoins);
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		if (searchParams.has('field') || searchParams.has('sort')) {
			const sortField = searchParams.get('field') as FieldNameType || 'rank';
			const sortDirection = searchParams.get('sort') as SortDirectionType || 'asc';
			
			const sortedCoins = coinsSorter(coins, sortDirection, sortField);
			dispatch(coinsActions.setSearchedFilteredCoins(sortedCoins));
			
			setActiveField(sortField);
		}
	}, []);

	const onActiveFieldChange = (field: FieldNameType) => {
		setActiveField(field);
	};

	return (
		<thead className={classnames(classes.header, className)}>
			<tr className={classes.row}>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>#</span>
						<ColumnToggleSort
							sortField={SortField.rank}
							activeField={activeField}
							onActiveFieldChange={onActiveFieldChange}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>{t('Name')}</span>
						<ColumnToggleSort
							sortField={SortField.name}
							activeField={activeField}
							onActiveFieldChange={onActiveFieldChange}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>{t('Price')}</span>
						<ColumnToggleSort
							sortField={SortField.price}
							activeField={activeField}
							onActiveFieldChange={onActiveFieldChange}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>{t('Change')}</span>
						<ColumnToggleSort
							sortField={SortField.change}
							activeField={activeField}
							onActiveFieldChange={onActiveFieldChange}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<div className={classes.headerItem}>
						<span>{t('24h volume')}</span>
						<ColumnToggleSort
							sortField={SortField['24hVolume']}
							activeField={activeField}
							onActiveFieldChange={onActiveFieldChange}
						/>
					</div>
				</th>
				<th className={classes.colHeader} colSpan={-1}>
					<div className={classes.headerItem}>
						<span>{t('Market cap')}</span>
						<ColumnToggleSort
							sortField={SortField.marketCap}
							activeField={activeField}
							onActiveFieldChange={onActiveFieldChange}
						/>
					</div>
				</th>
				<th className={classes.colHeader}>
					<span>=</span>
				</th>
			</tr>
		</thead>
	);
};
