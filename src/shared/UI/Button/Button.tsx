import type { FC, ComponentProps,  ReactNode } from 'react';
import { memo } from 'react';
import classnames from 'classnames';
import classes from './Button.module.scss';
import { LoaderRing } from '../LoaderRing/LoaderRing';

export type ButtonThemeType = 'primary' | 'secondary' | 'white' | 'red' | 'clear';
export type ButtonSizeType = 'sm' | 'md' | 'lg';


interface ButtonProps extends ComponentProps<'button'> {
	children: ReactNode;
	theme?: ButtonThemeType;
	size?: ButtonSizeType;
	isLoading?: boolean;
	loaderPlacement?: 'start' | 'end';
	disabled?: boolean;
	className?: string;
}

export const Button: FC<ButtonProps> = memo((props) => {
	const {
		children,
		theme = 'primary',
		size = 'md',
		className,
		isLoading,
		loaderPlacement = 'end',
		disabled,
		...otherProps
	} = props;

	return (
		<button
			className={classnames(
				classes.Button,
				className,
				classes[theme],
				classes[size],
				{ [classes.loading]: isLoading },
				{ [classes.disabled]: disabled || isLoading },
			)}
			disabled={isLoading}
			{...otherProps}
		>
			{isLoading && loaderPlacement === 'start' && (
				<LoaderRing className={classnames(classes.loader, classes.loaderStart)} />
			)}
			{children}
			{isLoading && loaderPlacement === 'end' && (
				<LoaderRing className={classnames(classes.loader, classes.loaderEnd)} />
			)}
		</button>
	);
});
