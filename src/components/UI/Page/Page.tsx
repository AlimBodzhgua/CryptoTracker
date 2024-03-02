import React, { ReactNode } from 'react';
import classnames from 'classnames';
import classes from './Page.module.scss';

interface PageProps {
	children: ReactNode;
	className?: string;
}

export const Page: React.FC<PageProps> = (props) => {
    const { children, className } = props;

    return (
        <div className={classnames(classes.Page, className)}>
            {children}
        </div>
    );
};
