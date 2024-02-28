import React from 'react';
import classnames from 'classnames';
import classes from './CoinsPage.module.scss';

interface CoinsPageProps {
	className?: string;
}

const CoinsPage: React.FC<CoinsPageProps> = ({ className }) => (
    <div className={classnames(classes.CoinsPage, className)}>
        CoinsPage
    </div>
);

export default CoinsPage;
