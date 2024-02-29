import React from 'react';
import classnames from 'classnames';
import classes from './Sidebar.module.scss';
import { sidebarList } from '../sidebarList';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
	className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => (
    <aside className={classnames(classes.Sidebar, className)}>
        <h1 className={classes.header}>Coin Cap</h1>
        <div className={classes.menu}>
            {sidebarList.map((item) => (
                <SidebarItem
                    key={item.path}
                    item={item}
                />
            ))}
        </div>
    </aside>
);
