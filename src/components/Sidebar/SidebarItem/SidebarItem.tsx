import React from 'react';
import { AppLink } from 'components/UI/AppLink/AppLink';
import classnames from 'classnames';
import { SidebarItemType } from '../types';
import classes from './SidebarItem.module.scss';

interface SidebarItemProps {
	item: SidebarItemType
	className?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = (props) => {
    const { item, className } = props;

    return (
        <AppLink
            to={item.path}
            className={classnames(classes.SidebarItem, className)}
        >
            <item.Icon className={classes.icon} />
            <div>{item.text}</div>
        </AppLink>
    );
};
