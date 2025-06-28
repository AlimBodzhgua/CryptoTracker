import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import classnames from 'classnames';

import { SortDirectionType, FieldNameType } from '../../model/types';
import { SortField } from '../../model/constants';
import { coinsSorter } from '../../model/utils';
import { coinsActions, coinsSelectors } from '../../model/coinsSlice';
import { ColumnToggleSort } from '../ColumnToggleSort/ColumnToggleSort';
import classes from './CoinTable.module.scss';

interface CoinTableHeaderProps {
	className?: string;
}

export const CoinTableHeader: FC<CoinTableHeaderProps> = ({ className }) => {
	const { t } = useTranslation();
	const [activeField, setActiveField] = useState<FieldNameType>(SortField.rank);
	const coins = useAppSelector(coinsSelectors.selectCoins);
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
					<ColumnToggleSort
						title='#'
						sortField={SortField.rank}
						activeField={activeField}
						onActiveFieldChange={onActiveFieldChange}
					/>
				</th>
				<th className={classes.colHeader}>
					<ColumnToggleSort
						title={t('Name')}
						position='left'
						sortField={SortField.name}
						activeField={activeField}
						onActiveFieldChange={onActiveFieldChange}
					/>
				</th>
				<th className={classes.colHeader}>
					<ColumnToggleSort
						title={t('Price')}
						sortField={SortField.price}
						activeField={activeField}
						onActiveFieldChange={onActiveFieldChange}
					/>
				</th>
				<th className={classes.colHeader}>
					<ColumnToggleSort
						title={t('Change')}
						sortField={SortField.change}
						activeField={activeField}
						onActiveFieldChange={onActiveFieldChange}
					/>
				</th>
				<th className={classes.colHeader}>
					<ColumnToggleSort
						title={t('24h volume')}
						sortField={SortField['24hVolume']}
						activeField={activeField}
						onActiveFieldChange={onActiveFieldChange}
					/>
				</th>
				<th className={classes.colHeader} colSpan={-1}>
					<ColumnToggleSort
						title={t('Market cap')}
						sortField={SortField.marketCap}
						activeField={activeField}
						onActiveFieldChange={onActiveFieldChange}
					/>
				</th>
				<th className={classes.colHeader}>
					<span>=</span>
				</th>
			</tr>
		</thead>
	);
};
