import { FC } from 'react';
import { ColorRing } from 'react-loader-spinner';

import classnames from 'classnames';
import classes from './LoaderRing.module.scss';

interface LoaderRingProps {
	className?: string;
}

export const LoaderRing: FC<LoaderRingProps> = ({ className }) => (
	<div className={classnames(classes.LoaderRing, className)}>
		<ColorRing
			visible
			height='80'
			width='80'
			ariaLabel='color-ring-loading'
			wrapperStyle={{}}
			wrapperClass={classnames(classes.LoaderRing, className)}
			colors={['#e6e6e6', '#cccccc', '#b3b3b3', '#bfbfbf', '#e6e6e6']}
		/>
	</div>
);
