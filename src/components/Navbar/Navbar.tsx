import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from 'components/LangSwitcher/LangSwitcher';
import { CurrencySwitcher } from 'components/CurrencySwitcher/CurrencySwitcher';
import { Button, ButtonTheme } from 'components/UI/Button/Button';
import {
    RegisterModal,
} from 'components/Auth/AuthModals/RegisterModal/RegisterModal';
import { LoginModal } from 'components/Auth/AuthModals/LoginModal/LoginModal';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectUser } from 'redux/selectors/userSelectors';
import { signOutUser } from 'redux/actions/userActions';

import classnames from 'classnames';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import classes from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar: React.FC<NavbarProps> = memo(({ className }) => {
    const { t } = useTranslation();
    const [isRegisterModal, setIsRegisterModal] = useState<boolean>(false);
    const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectUser);

    const onCloseRegisterModal = () => {
        setIsRegisterModal(false);
    };

    const onOpenRegisterModal = () => {
        setIsRegisterModal(true);
    };

    const onOpenLoginModal = () => {
        setIsLoginModal(true);
    };

    const onCloseLoginModal = () => {
        setIsLoginModal(false);
    };

    const onLogout = async () => {
        dispatch(signOutUser())
            .then(({ meta }) => {
                if (meta.requestStatus === 'fulfilled') {
                    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
                }
            });
    };

    return (
        <nav className={classnames(classes.Navbar, className)}>
            <LangSwitcher />
            <CurrencySwitcher />
            <div className={classes.auth}>
                {isAuth
                    ? (
                        <Button
                            theme={ButtonTheme.clear}
                            onClick={onLogout}
                        >
                            {t('Logout')}
                        </Button>
                    )
                    : (
                        <>
                            <Button
                                theme={ButtonTheme.clear}
                                onClick={onOpenRegisterModal}
                            >
                                {t('Sign up')}
                            </Button>
                            <RegisterModal
                                isOpen={isRegisterModal}
                                onClose={onCloseRegisterModal}
                            />

                            <Button
                                theme={ButtonTheme.clear}
                                onClick={onOpenLoginModal}
                            >
                                {t('Login')}
                            </Button>
                            <LoginModal
                                isOpen={isLoginModal}
                                onClose={onCloseLoginModal}
                            />
                        </>
                    )}
            </div>
        </nav>
    );
});
