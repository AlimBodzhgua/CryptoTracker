import type { FC } from 'react';
import type { SidebarItemType } from '../../model/types';

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink } from 'shared/UI/AppLink/AppLink';
import classnames from 'classnames';
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
