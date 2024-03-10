import React from 'react';
import classnames from 'classnames';
import classes from './MainPage.module.scss';

interface MainPageProps {
	className?: string;
}

const MainPage: React.FC<MainPageProps> = ({ className }) => (
    <div className={classnames(classes.MainPage, className)} />
 	);

export default MainPage;
