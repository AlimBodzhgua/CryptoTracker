import { FC, useEffect, useState, memo, useMemo } from 'react';
import { FieldNameType, SortDirectionType } from 'types/coin';
import { coinsSorter } from 'utils/utils';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectCoins } from 'redux/selectors/coinsSelectors';
import { coinsActions } from 'redux/slices/coinsSlice';
import { useSearchParams } from 'react-router-dom';

import classnames from 'classnames';
import classes from './TriangleSorter.module.scss';

interface TriangleSorterProps {
	sortField: FieldNameType;
	activeTriangle: FieldNameType;
	setActiveTriangle: React.Dispatch<React.SetStateAction<FieldNameType>>;
	className?: string;
}

const SortDirection = {
    ascending: 'ascending',
    descending: 'descending',
} as const;

export const TriangleSorter: FC<TriangleSorterProps> = memo((props) => {
    const {
        sortField,
        activeTriangle,
        setActiveTriangle,
        className,
    } = props;
    const [sortDirection, setSortDirection] = useState<SortDirectionType>(SortDirection.ascending);
    const [searchParams, setSearchParams] = useSearchParams();
    const coins = useAppSelector(selectCoins);
    const dispatch = useAppDispatch();

    const isActive = useMemo(() => (
        activeTriangle === sortField
    ), [activeTriangle]);

    useEffect(() => {
        if (searchParams.has('by')) {

            const sortValues: string[] = Object.values(SortDirection);
            const paramSortValue = searchParams.get('by');
             
            if (sortValues.includes(paramSortValue!)) {
                setSortDirection(paramSortValue as SortDirectionType);
            } else {
                throw Error('Such url does not exist');
            }
        }
    }, [])

    useEffect(() => {
        if (isActive) {
            const sortedCoins = coinsSorter(coins, sortDirection, sortField);
            dispatch(coinsActions.setSearchedFilteredCoins(sortedCoins));
            const searchParams = new URLSearchParams({'field': sortField, 'by': sortDirection});
            setSearchParams(searchParams);
        }
    }, [sortDirection, isActive]);

    const onToggleSortDirection = () => {
        setActiveTriangle(sortField);
        setSortDirection(sortDirection === SortDirection.ascending
            ? SortDirection.descending
            : SortDirection.ascending
        );
    };

    return (
        <div
            className={classnames(classes.TriangleSorter, className)}
            onClick={onToggleSortDirection}
            role='button'
            tabIndex={0}
        >
            <span className={classnames(
                classes.topAngle,
                sortDirection === SortDirection.descending && isActive ? classes.active : undefined,
            )}/>
            <span className={classnames(
                classes.botAngle,
                sortDirection === SortDirection.ascending && isActive ? classes.active : undefined,
            )}/>
        </div>
    );
});
