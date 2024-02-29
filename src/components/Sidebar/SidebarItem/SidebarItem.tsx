import React from 'react';
import { AppLink } from 'components/UI/AppLink/AppLink';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { SidebarItemType } from '../types';
import classes from './SidebarItem.module.scss';

interface SidebarItemProps {
	item: SidebarItemType
	className?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = (props) => {
    const { item, className } = props;
    const { t } = useTranslation();

    return (
        <AppLink
            to={item.path}
            className={classnames(classes.SidebarItem, className)}
        >
            <item.Icon className={classes.icon} />
            <div>{t(`${item.text}`)}</div>
        </AppLink>
    );
};
