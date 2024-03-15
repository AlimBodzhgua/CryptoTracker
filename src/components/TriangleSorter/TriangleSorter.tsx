import React, {
    useEffect, useState, memo, useMemo,
} from 'react';
import { FieldNameType, SortDirectionType } from 'types/coin';
import { coinsSorter } from 'utils/utils';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectCoins } from 'redux/selectors/coinsSelectors';
import { coinsActions } from 'redux/slices/coinsSlice';

import classnames from 'classnames';
import classes from './TriangleSorter.module.scss';

interface TriangleSorterProps {
	sortField: FieldNameType;
	activeTriangle: FieldNameType;
	setActiveTriangle: React.Dispatch<React.SetStateAction<FieldNameType>>;
	className?: string;
}

export const TriangleSorter: React.FC<TriangleSorterProps> = memo((props) => {
    const {
        sortField,
        activeTriangle,
        setActiveTriangle,
        className,
    } = props;
    const [sortDirection, setSortDirection] = useState<SortDirectionType | undefined>();
    const coins = useAppSelector(selectCoins);
    const dispatch = useAppDispatch();

    const onToggleSortDirection = () => {
        setActiveTriangle(sortField);
        if (sortDirection) {
            setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
        } else {
            setSortDirection('ascending');
        }
    };

    useEffect(() => {
        if (sortDirection) {
            const sortedCoins = coinsSorter(coins, sortDirection, sortField);
            dispatch(coinsActions.setSearchedFilteredCoins(sortedCoins));
        }
    }, [sortDirection]);

    const isActive = useMemo(() => (
        activeTriangle === sortField
    ), [activeTriangle]);

    return (
        <div
            className={classnames(classes.TriangleSorter, className)}
            onClick={onToggleSortDirection}
            role='button'
            tabIndex={0}
        >
            <span className={classnames(
                classes.topAngle,
                sortDirection === 'descending' && isActive ? classes.active : undefined,
            )}
            />
            <span className={classnames(
                classes.botAngle,
                sortDirection === 'ascending' && isActive ? classes.active : undefined,
            )}
            />
        </div>
    );
});
