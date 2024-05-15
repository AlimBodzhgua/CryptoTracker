import React, { ReactNode, memo } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import classnames from 'classnames';
import classes from './AppLink.module.scss';

export interface AppLinkProps extends NavLinkProps {
	className?: string;
	children: ReactNode;
}

export const AppLink: React.FC<AppLinkProps> = memo((props) => {
	const {
		children,
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
