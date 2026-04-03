import type { FC, ReactNode } from 'react';
import classes from './Hotkey.module.scss';
import classnames from 'classnames';

interface HotkeyProps {
	children: ReactNode;
	className?: string;
}

export const Hotkey: FC<HotkeyProps> = ({ children, className }) => {
	return (
		<div className={classnames(classes.Hotkey, className)}>
			{children}
		</div>
	)
};
