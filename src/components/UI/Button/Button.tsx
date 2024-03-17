import React, { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import classnames from 'classnames';
import classes from './Button.module.scss';

export const ButtonTheme = {
    primary: 'primary',
    secondary: 'secondary',
    clear: 'clear',
} as const;

export type ButtonThemeType = keyof typeof ButtonTheme;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	theme?: ButtonThemeType;
    disabled?: boolean;
	className?: string;
}

export const Button: React.FC<ButtonProps> = memo((props) => {
    const {
        children,
        theme = ButtonTheme.primary,
        className,
        disabled,
        ...otherProps
    } = props;

    return (
        <button
            className={classnames(
                classes.Button,
                classes[theme],
                className,
                { [classes.disabled]: disabled },
            )}
            {...otherProps}
        >
            {children}
        </button>
    );
});
