import React, { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import classnames from 'classnames';
import classes from './Button.module.scss';

export type ButtonThemeType = 'primary' | 'secondary' | 'clear';
export type ButtonSizeType = 'small' | 'medium' | 'big';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	theme?: ButtonThemeType;
	size?: ButtonSizeType;
	disabled?: boolean;
	className?: string;
}

export const Button: React.FC<ButtonProps> = memo((props) => {
	const {
		children,
		theme = 'primary',
		size = 'medium',
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
