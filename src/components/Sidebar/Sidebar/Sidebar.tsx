import { FC, memo, useState } from 'react';
import { sidebarList } from 'constants/sidebarList';
import { Button } from 'components/UI/Button/Button';
import LeftIcon from 'assets/icons/left_arrow.svg';
import RightIcon from 'assets/icons/right_arrow.svg';

import classnames from 'classnames';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import classes from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}

export const Sidebar: FC<SidebarProps> = memo(({ className }) => {
	const [collapsed, setCollapsed] = useState<boolean>(false);

	const onToggle = () => {
		setCollapsed(!collapsed);
	};

	return (
		<aside
			className={classnames(classes.Sidebar, className, {
				[classes.collapsed]: collapsed,
			})}
			data-testid='sidebar'
		>
			<h1 className={classes.header}>Coin Cap</h1>
			<div className={classes.menu}>
				{sidebarList.map((item) => (
					<SidebarItem
						key={item.path}
						item={item}
						collapsed={collapsed}
					/>
				))}
			</div>
			<Button
				className={classes.toggleBtn}
				onClick={onToggle}
				theme='clear'
				data-testid='toggle-button'
			>
				{collapsed ? (
					<RightIcon className={classes.arrowIcon} />
				) : (
					<LeftIcon className={classes.arrowIcon} />
				)}
			</Button>
		</aside>
	);
});
