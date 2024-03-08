import React from 'react';
import classnames from 'classnames';
import { Skeleton } from 'components/UI/Skeleton/Skeleton';
import classes from './CoinTable.module.scss';

interface CoinsTableSkeletonProps {
	className?: string;
}

export const CoinsTableSkeleton: React.FC<CoinsTableSkeletonProps> = ({ className }) => (
    <table className={
        classnames(classes.table, className, classes.loading)
    }
    >
        <thead className={classes.header}>
            <tr className={classes.row}>
                <th><Skeleton width={135} height={30} radius='10px' /></th>
                <th><Skeleton width={135} height={30} radius='10px' /></th>
                <th><Skeleton width={135} height={30} radius='10px' /></th>
                <th><Skeleton width={135} height={30} radius='10px' /></th>
                <th><Skeleton width={135} height={30} radius='10px' /></th>
            </tr>
        </thead>
        <tbody>
            {new Array(12).fill(0).map((value, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={index}>
                    <th colSpan={5}>
                        <Skeleton width='100%' height={35} radius='10px' />
                    </th>
                </tr>
				    ))}
        </tbody>
    </table>
);
