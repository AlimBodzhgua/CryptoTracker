import type { FC, ComponentProps,  ReactNode } from 'react';
import { memo } from 'react';
import classnames from 'classnames';
import classes from './Button.module.scss';

export type ButtonThemeType = 'primary' | 'secondary' | 'white' | 'red' | 'clear';
export type ButtonSizeType = 'sm' | 'md' | 'lg';

interface ButtonProps extends ComponentProps<'button'> {
	children: ReactNode;
	theme?: ButtonThemeType;
	size?: ButtonSizeType;
	disabled?: boolean;
	className?: string;
}

export const Button: FC<ButtonProps> = memo((props) => {
	const {
		children,
		theme = 'primary',
		size = 'md',
		className,
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
				{ [classes.disabled]: disabled },
			)}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	);
});
