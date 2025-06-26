import { FC, memo } from 'react';
import { AppLink } from 'shared/UI/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import type { SidebarItemType } from '../../model/types';
import classes from './SidebarItem.module.scss';

interface SidebarItemProps {
	item: SidebarItemType;
	className?: string;
	collapsed?: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = memo((props) => {
	const { item, collapsed, className } = props;
	const { t } = useTranslation();

	return (
		<AppLink
			to={item.path}
			className={classnames(classes.SidebarItem, className, {
				[classes.collapsed]: collapsed,
			})}
			data-testid='sidebar-item'
		>
			<item.Icon className={classes.icon} />
			<div className={classes.linkText}>{t(`${item.text}`)}</div>
		</AppLink>
	);
});
