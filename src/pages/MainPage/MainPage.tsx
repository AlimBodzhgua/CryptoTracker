import React from 'react';
import { Input } from 'components/UI/Input/Input';
import SearchIcon from 'assets/search.svg';
import classnames from 'classnames';
import classes from './MainPage.module.scss';

interface MainPageProps {
	className?: string;
}

const MainPage: React.FC<MainPageProps> = ({ className }) => (
    <div className={classnames(classes.MainPage, className)}>
        {/*
        <Sidebar />
        <Navbar />
        <Input addonBefore={<SearchIcon />}/>
         */}
    </div>
);

export default MainPage;
