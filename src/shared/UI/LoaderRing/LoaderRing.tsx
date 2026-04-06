import type { FC } from 'react';
import { ColorRing } from 'react-loader-spinner';

interface LoaderRingProps {
	className?: string;
	height?: string | number;
	width?: string | number;
}

export const LoaderRing: FC<LoaderRingProps> = (props) => {
	const {
		width = '80px',
		height = '80px',
		className,
	} = props;

	return (
		<div className={className}>
			<ColorRing
				visible
				height={height}
				width={width}
				ariaLabel='color-ring-loading'
				wrapperStyle={{}}
				wrapperClass={className}
				colors={['#e6e6e6', '#cccccc', '#b3b3b3', '#bfbfbf', '#e6e6e6']}
			/>
		</div>
	);
};
