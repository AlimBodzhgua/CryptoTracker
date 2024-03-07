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
	className?: string;
}

export const Button: React.FC<ButtonProps> = memo((props) => {
    const {
        children,
        theme = ButtonTheme.primary,
        className,
        ...otherProps
    } = props;

    return (
        <button
            className={classnames(classes.Button, className, classes[theme])}
            {...otherProps}
        >
            {children}
        </button>
    );
});
