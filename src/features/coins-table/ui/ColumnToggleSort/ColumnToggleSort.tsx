import { FC, useState, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { useSearchParams } from 'react-router-dom';
import classnames from 'classnames';

import { selectCoins } from '../../model/coinsSelectors';
import { coinsActions } from '../../model/coinsSlice';
import { SortDirection } from '../../model/constants';
import { coinsSorter } from '../../model/utils';
import { SortDirectionType, FieldNameType } from '../../model/types';
import classes from './ColumnToggleSort.module.scss';

type TitlePosition = 'left' | 'middle' | 'right';

interface ColumnToggleSortProps {
	title: string;
	sortField: FieldNameType;
	activeField: FieldNameType;
	onActiveFieldChange: (field: FieldNameType) => void;
	position?: TitlePosition;
	className?: string;
}

export const ColumnToggleSort: FC<ColumnToggleSortProps> = memo((props) => {
	const {
		title,
		sortField,
		activeField,
		position = 'middle',
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
			className={classnames(classes.ColumnToggleSort, classes[position], className)}
			onClick={onToggleSortDirection}
			role='button'
			tabIndex={0}
			data-testid='sorter'
		>
			<div>{title}</div>
			<div className={classes.arrows}>
				<span
					className={classnames(
						classes.arrowUp,
						{ [classes.active]: sortDirection === SortDirection.asc && isActive },
					)}
				/>
				<span
					className={classnames(
						classes.arrowDown,
						{ [classes.active]: sortDirection === SortDirection.desc && isActive },
					)}
				/>
			</div>
		</div>
	);
});
