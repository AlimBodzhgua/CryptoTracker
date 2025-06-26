import { FC, memo, ReactNode } from 'react';

import classnames from 'classnames';
import classes from './Header.module.scss';

interface HeaderProps {
	elements?: ReactNode;
	className?: string;
}

export const Header: FC<HeaderProps> = memo((props) => {
	const { elements, className } = props;

	return (
		<header className={classnames(classes.Header, className)}>
			{elements}
		</header>
	);
});
