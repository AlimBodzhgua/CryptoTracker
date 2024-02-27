import React from 'react';
import classnames from 'classnames';
import classes from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => (
    <nav className={classnames(classes.Navbar, className)}>
        <div className={classes.auth}>
            <div>Зарегистрироваться</div>
            <div>Войти</div>
        </div>
    </nav>
);
