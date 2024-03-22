import React, { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import classnames from 'classnames';
import classes from './Button.module.scss';

export const ButtonTheme = {
    primary: 'primary',
    secondary: 'secondary',
    clear: 'clear',
} as const;

export type ButtonThemeType = keyof typeof ButtonTheme;

export const ButtonSize = {
    small: 'small',
    medium: 'medium',
    big: 'big',
} as const;

export type ButtonSizeType = keyof typeof ButtonSize;

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
        theme = ButtonTheme.primary,
        size = ButtonSize.medium,
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
            {...otherProps}
        >
            {children}
        </button>
    );
});
