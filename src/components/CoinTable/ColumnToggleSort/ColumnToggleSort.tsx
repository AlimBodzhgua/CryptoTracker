import { FC, useState, memo } from 'react';
import { FieldNameType, SortDirectionType } from 'types/coin';
import { coinsSorter } from 'utils/utils';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectCoins } from 'store/selectors/coinsSelectors';
import { coinsActions } from 'store/slices/coinsSlice';
import { useSearchParams } from 'react-router-dom';
import { SortDirection } from 'constants/sort';

import classnames from 'classnames';
import classes from './ColumnToggleSort.module.scss';

interface ColumnToggleSortProps {
	columnTitle: string;
	sortField: FieldNameType;
	activeField: FieldNameType;
	onActiveFieldChange: (field: FieldNameType) => void;
	className?: string;
}

export const ColumnToggleSort: FC<ColumnToggleSortProps> = memo((props) => {
	const {
		columnTitle,
		sortField,
		activeField,
		onActiveFieldChange,
		className,
	} = props;
	const [sortDirection, setSortDirection] = useState<SortDirectionType>(SortDirection.desc);
	const [_, setSearchParams] = useSearchParams();
	const coins = useAppSelector(selectCoins);
	const dispatch = useAppDispatch();
	const isActive = activeField === sortField;

	const onToggleSortDirection = () => {
		const nextDirection = sortDirection === SortDirection.asc ? SortDirection.desc : SortDirection.asc;
		
		const sortedCoins = coinsSorter(coins, nextDirection, sortField);
		dispatch(coinsActions.setSearchedFilteredCoins(sortedCoins));

		setSearchParams({ field: sortField, sort: nextDirection });
		onActiveFieldChange(sortField);
		setSortDirection(nextDirection);
	};

	return (
		<div
			className={classnames(classes.ColumnToggleSort, className)}
			onClick={onToggleSortDirection}
			role='button'
			tabIndex={0}
			data-testid='sorter'
		>
			<div>{columnTitle}</div>
			<div className={classes.arrows}>
				<span
					className={classnames(
						classes.arrowUp,
						{ [classes.active] : sortDirection === SortDirection.asc && isActive}
					)}
				/>
				<span
					className={classnames(
						classes.arrowDown,
						{ [classes.active]: sortDirection === SortDirection.desc && isActive }
					)}
				/>
			</div>
		</div>
	);
});

