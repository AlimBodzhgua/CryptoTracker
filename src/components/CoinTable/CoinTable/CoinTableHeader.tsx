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
					<ColumnToggleSort
						columnTitle={'#'}
						sortField={SortField.rank}
						activeField={activeField}
						onActiveFieldChange={onActiveFieldChange}
					/>
				</th>
				<th className={classes.colHeader}>
					<ColumnToggleSort
						columnTitle={t('Name')}
						sortField={SortField.name}
						activeField={activeField}
						onActiveFieldChange={onActiveFieldChange}
					/>
				</th>
				<th className={classes.colHeader}>
					<ColumnToggleSort
						columnTitle={t('Price')}
						sortField={SortField.price}
						activeField={activeField}
						onActiveFieldChange={onActiveFieldChange}
					/>
				</th>
				<th className={classes.colHeader}>
					<ColumnToggleSort
						columnTitle={t('Change')}
						sortField={SortField.change}
						activeField={activeField}
						onActiveFieldChange={onActiveFieldChange}
					/>
				</th>
				<th className={classes.colHeader}>
					<ColumnToggleSort
						columnTitle={t('24h volume')}
						sortField={SortField['24hVolume']}
						activeField={activeField}
						onActiveFieldChange={onActiveFieldChange}
					/>
				</th>
				<th className={classes.colHeader} colSpan={-1}>
					<ColumnToggleSort
						columnTitle={t('Market cap')}
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
