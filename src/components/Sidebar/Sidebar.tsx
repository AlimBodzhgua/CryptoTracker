import React from 'react';
import classnames from 'classnames';
import { AppLink } from 'components/UI/AppLink/AppLink';
import classes from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => (
    <aside className={classnames(classes.Sidebar, className)}>
        <h1>Coin Cap</h1>
        <div className={classes.menu}>
            <AppLink to=''>
                <span>Coins</span>
            </AppLink>
            <AppLink to=''>
                <span>News</span>
            </AppLink>
            <AppLink to=''>
                <span>Profile</span>
            </AppLink>
        </div>
    </aside>
);
