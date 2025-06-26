import { FC, ReactNode } from 'react';
import classnames from 'classnames';
import classes from './PageLayout.module.scss';

interface PageLayoutProps {
	children: ReactNode;
	className?: string;
}

export const PageLayout: FC<PageLayoutProps> = (props) => {
	const { children, className } = props;

	return (
		<main className={classnames(classes.PageLayout, className)}>
			{children}
		</main>
	)
}