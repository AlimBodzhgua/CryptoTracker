import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from 'components/LangSwitcher/LangSwitcher';
import { CurrencySwitcher } from 'components/CurrencySwitcher/CurrencySwitcher';
import { Button, ButtonTheme } from 'components/UI/Button/Button';
import classnames from 'classnames';
import classes from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar: React.FC<NavbarProps> = memo(({ className }) => {
    const { t } = useTranslation();

    return (
        <nav className={classnames(classes.Navbar, className)}>
            <LangSwitcher />
            <CurrencySwitcher />
            <div className={classes.auth}>
                <Button theme={ButtonTheme.clear}>{t('Sign up')}</Button>
                <Button theme={ButtonTheme.clear}>{t('Login')}</Button>
            </div>
        </nav>
    );
});
