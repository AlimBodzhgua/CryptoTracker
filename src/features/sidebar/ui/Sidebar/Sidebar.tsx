import { FC, memo, useState } from 'react';
import { Button } from 'shared/UI/Button/Button';
import classnames from 'classnames';
import { sidebarList } from '../../model/sidebarList';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import LeftIcon from '../../assets/left_arrow.svg';
import RightIcon from '../../assets/right_arrow.svg';
import classes from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}

export const Sidebar: FC<SidebarProps> = memo(({ className }) => {
	const [collapsed, setCollapsed] = useState<boolean>(false);

	const onToggleCollapsed = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<aside
			className={classnames(classes.Sidebar, className, {
				[classes.collapsed]: collapsed,
			})}
			data-testid='sidebar'
		>
			<h1 className={classes.title}>Crypto Tracker</h1>
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
				onClick={onToggleCollapsed}
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
