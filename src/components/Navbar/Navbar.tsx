import { FC, memo, useCallback, useEffect, useState } from 'react';
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
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { useSearchParams } from 'react-router-dom';

import classnames from 'classnames';
import classes from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
    const { t } = useTranslation();
    const [isRegisterModal, setIsRegisterModal] = useState<boolean>(false);
    const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectUser);

    const [searchParams, setSearchParams] = useSearchParams();

    const onCloseRegisterModal = useCallback(() => {
        setIsRegisterModal(false);
        setSearchParams('');
    }, []);

    const onOpenRegisterModal = useCallback(() => {
        setIsRegisterModal(true);
        setSearchParams({ modal: 'register' });
    }, []);

    const onOpenLoginModal = useCallback(() => {
        setIsLoginModal(true);
        setSearchParams({ modal: 'login' });
    }, []);

    const onCloseLoginModal = useCallback(() => {
        setIsLoginModal(false);
        setSearchParams('');
    }, []);

    useEffect(() => {
        if (searchParams.has('modal', 'register')) {
            onCloseLoginModal();
            onOpenRegisterModal();
        }
        if (searchParams.has('modal', 'login')) {
            onCloseRegisterModal();
            onOpenLoginModal();
        }
    }, [searchParams]);

    const onLogout = useCallback(async () => {
        const confirm = window.confirm(t('Are you sure you want to logout?'));

        if (confirm) {
            const { meta } = await dispatch(signOutUser());

            if (meta.requestStatus === 'fulfilled') {
                localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            }
        }
    }, [dispatch]);

    return (
        <nav className={classnames(classes.Navbar, className)}>
            <div className={classes.actions}>
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
                <CurrencySwitcher />
                <LangSwitcher />
            </div>
        </nav>
    );
});
