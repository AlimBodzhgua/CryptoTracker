import type { FC } from 'react';

import { memo, useState } from 'react';
import { Button } from 'shared/UI/Button/Button';
import classnames from 'classnames';

import { SidebarItem } from '../SidebarItem/SidebarItem';
import { sidebarList } from '../../model/sidebarList';
import LeftIcon from '../../assets/left_arrow.svg';
import RightIcon from '../../assets/right_arrow.svg';
import classes from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}

export const Sidebar: FC<SidebarProps> = memo(({ className }) => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

	const onToggleIsCollapsed = () => {
		setIsCollapsed((prev) => !prev);
	};

	return (
		<aside
			className={classnames(classes.Sidebar, className, {
				[classes.collapsed]: isCollapsed,
			})}
			data-testid='sidebar'
		>
			<h1 className={classes.title}>Crypto Tracker</h1>
			<div className={classes.menu}>
				{sidebarList.map((item) => (
					<SidebarItem
						key={item.path}
						item={item}
						collapsed={isCollapsed}
					/>
				))}
			</div>
			<Button
				className={classes.toggleBtn}
				onClick={onToggleIsCollapsed}
				size='sm'
				theme='clear'
				data-testid='toggle-button'
			>
				{isCollapsed ? (
					<RightIcon className={classes.arrowIcon} />
				) : (
					<LeftIcon className={classes.arrowIcon} />
				)}
			</Button>
		</aside>
	);
});
