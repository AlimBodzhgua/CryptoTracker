import { FC, memo } from 'react';
import { sidebarList } from 'constants/sidebarList';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import classnames from 'classnames';
import classes from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}

export const Sidebar: FC<SidebarProps> = memo(({ className }) => (
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
