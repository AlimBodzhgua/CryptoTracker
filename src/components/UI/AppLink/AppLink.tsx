import React, { ReactNode, memo } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import classnames from 'classnames';
import classes from './AppLink.module.scss';

const AppLinkTheme = {
    PRIMARY: 'PRIMARY',
    SECONDARY: 'SECONDARY',
} as const;

export type AppLinkThemeType = keyof typeof AppLinkTheme;

export interface AppLinkProps extends NavLinkProps {
	className?: string;
	theme?: AppLinkThemeType;
	children: ReactNode;
}

export const AppLink: React.FC<AppLinkProps> = memo((props) => {
    const {
        children,
        theme = AppLinkTheme.PRIMARY,
        className,
        ...otherProps
    } = props;

    return (
        <NavLink
            {...otherProps}
            className={classnames(classes.AppLink, className)}
        >
            {children}
        </NavLink>
    );
});
