import React, { memo } from 'react';
import { sidebarList } from 'constants/sidebarList';
import classnames from 'classnames';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import classes from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}

export const Sidebar: React.FC<SidebarProps> = memo(({ className }) => (
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
));
