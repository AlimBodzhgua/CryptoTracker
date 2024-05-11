import React, { memo } from 'react';
import { AppLink } from 'components/UI/AppLink/AppLink';
import { SidebarItemType } from 'types/sidebar';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import classes from './SidebarItem.module.scss';

interface SidebarItemProps {
	item: SidebarItemType
	className?: string;
    collapsed?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = memo((props) => {
    const {
        item,
        collapsed,
        className,
    } = props;
    const { t } = useTranslation();

    return (
        <AppLink
            to={item.path}
            className={classnames(
                classes.SidebarItem,
                className,
                {[classes.collapsed]: collapsed}
            )}
        >
            <item.Icon className={classes.icon} />
            <div className={classes.linkText}>{t(`${item.text}`)}</div>
        </AppLink>
    );
});
