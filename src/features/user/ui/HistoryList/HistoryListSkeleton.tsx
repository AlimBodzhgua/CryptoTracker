import type { FC } from 'react';

import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import classnames from 'classnames';
import classes from './HistoryList.module.scss';

interface HistoryListSkeletonProps {
	className?: string;
}

export const HistoryListSkeleton: FC<HistoryListSkeletonProps> = ({ className }) => {
	return (
		<ul className={classnames(classes.HistoryList, className)}>
			{Array(4)
				.fill(0)
				.map((_, index) => (
					<Skeleton
						// eslint-disable-next-line
						key={index}
						width='100%'
						height='32px'
						radius='6px'
						className={classes.skeletonItem}
					/>
				))}
		</ul>
	);
};