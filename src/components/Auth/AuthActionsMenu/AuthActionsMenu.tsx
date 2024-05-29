import { FC, useCallback, useEffect, useState, memo } from 'react';
import { Button } from 'components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { selectUser } from 'store/selectors/userSelectors';
import { signOutUser } from 'store/actions/userActions';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import classnames from 'classnames';

import { LoginModal } from '../AuthModals/LoginModal/LoginModal';
import { RegisterModal } from '../AuthModals/RegisterModal/RegisterModal';
import classes from './AuthActionsMenu.module.scss';

interface AuthActionsMenuProps {
	className?: string;
}

export const AuthActionsMenu: FC<AuthActionsMenuProps> = memo(({ className }) => {
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
		const confirm = window.confirm(
			t('Are you sure you want to logout?'),
		);

		if (confirm) {
			const { meta } = await dispatch(signOutUser());

			if (meta.requestStatus === 'fulfilled') {
				localStorage.removeItem(USER_LOCALSTORAGE_KEY);
			}
		}
	}, [dispatch]);

	return (
		<div
			className={classnames(classes.AuthActionsMenu, className)}
			data-testid='auth-menu'
		>
			{isAuth ? (
				<Button
					theme='clear'
					onClick={onLogout}
					data-testid='logout-button'
				>
					{t('Logout')}
				</Button>
			) : (
				<>
					<Button
						theme='clear'
						onClick={onOpenRegisterModal}
						data-testid='signup-button'
					>
						{t('Sign up')}
					</Button>
					<RegisterModal
						isOpen={isRegisterModal}
						onClose={onCloseRegisterModal}
					/>

					<Button
						theme='clear'
						onClick={onOpenLoginModal}
						data-testid='login-button'
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
	);
});
