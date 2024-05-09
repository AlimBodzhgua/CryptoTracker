import { FC, memo } from 'react';
import { LangSwitcher } from 'components/LangSwitcher/LangSwitcher';
import { CurrencySwitcher } from 'components/CurrencySwitcher/CurrencySwitcher';
import { AuthActionsMenu } from 'components/Auth';

import classnames from 'classnames';
import classes from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {

    return (
        <nav className={classnames(classes.Navbar, className)}>
            <div className={classes.actions}>
                <AuthActionsMenu />
                <CurrencySwitcher />
                <LangSwitcher />
            </div>
        </nav>
    );
});
