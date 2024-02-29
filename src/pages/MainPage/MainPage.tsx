import React from 'react';
import { Sidebar } from 'components/Sidebar/Sidebar/Sidebar';
import { Navbar } from 'components/Navbar/Navbar';
import classnames from 'classnames';
import classes from './MainPage.module.scss';

interface MainPageProps {
	className?: string;
}

const MainPage: React.FC<MainPageProps> = ({ className }) => (
    <div className={classnames(classes.MainPage, className)}>
        <Sidebar />
        <Navbar />
    </div>
);

export default MainPage;
