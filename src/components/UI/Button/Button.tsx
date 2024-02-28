import React, { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import classnames from 'classnames';
import classes from './Button.module.scss';

const ButtonTheme = {
    PRIMARY: 'PRIMARY',
    SECONDARY: 'SECONDARY',
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
        theme = ButtonTheme.PRIMARY,
        className,
        ...otherProps
    } = props;

    return (
        <button
            className={classnames(classes.Button, className)}
            {...otherProps}
        >
            {children}
        </button>
    );
});
