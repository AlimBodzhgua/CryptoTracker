import React, { memo } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from 'components/LangSwitcher/LangSwitcher';
import classes from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar: React.FC<NavbarProps> = memo(({ className }) => {
    const { t } = useTranslation();

    return (
        <nav className={classnames(classes.Navbar, className)}>
            <LangSwitcher />
            <div className={classes.auth}>
                <div>{t('Sign up')}</div>
                <div>{t('Login')}</div>
            </div>
        </nav>
    );
});
