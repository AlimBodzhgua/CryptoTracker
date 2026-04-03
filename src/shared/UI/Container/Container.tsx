// components/ui/Container.tsx
import type { FC, ReactNode } from 'react';
import classnames from 'classnames';
import classes from './Container.module.scss';

interface ContainerProps {
	children: ReactNode;
	size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
	className?: string;
	padding?: 'none' | 'small' | 'normal';
}

const Container: FC<ContainerProps> = ({
	children,
	size = 'lg',
	className,
	padding = 'none',
}) => {
	return (
		<div
			className={classnames(
				classes.container,
				classes[`container--${size}`],
				classes[`container--padding-${padding}`],
				className,
			)}
		>
			{children}
		</div>
	);
};

export default Container;
