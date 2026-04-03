import type { FC } from 'react';
import { useEffect, useState, memo } from 'react';
import { Button } from 'shared/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants/localStorage';
import classnames from 'classnames';

import { userSelectors } from '../../model/userSlice';
import { signOutUser } from '../../model/userActions';
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
	const [searchParams, setSearchParams] = useSearchParams();
	const isAuth = useAppSelector(userSelectors.selectUser);
	const dispatch = useAppDispatch();

	const onOpenRegisterModal = () => {
		setIsRegisterModal(true);
		setSearchParams({ modal: 'register' });
	};

	const onCloseRegisterModal = () => {
		setIsRegisterModal(false);
		setSearchParams('');
	};

	const onOpenLoginModal = () => {
		setIsLoginModal(true);
		setSearchParams({ modal: 'login' });
	};

	const onCloseLoginModal = () => {
		setIsLoginModal(false);
		setSearchParams('');
	};

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

	const onLogout = async () => {
		const confirm = window.confirm(t('messages.logout_confirmation'));

		if (confirm) {
			const { meta } = await dispatch(signOutUser());

			if (meta.requestStatus === 'fulfilled') {
				localStorage.removeItem(USER_LOCALSTORAGE_KEY);
			}
		}
	};

	return (
		<div
			className={classnames(classes.AuthActionsMenu, className)}
			data-testid='auth-menu'
		>
			{isAuth ? (
				<Button
					theme='primary'
					size='small'
					onClick={onLogout}
					data-testid='logout-button'
				>
					{t('buttons.logout')}
				</Button>
			) : (
				<>
					<Button
						theme='primary'
						size='small'
						onClick={onOpenRegisterModal}
						data-testid='signup-button'
					>
						{t('buttons.sign_up')}
					</Button>
					<RegisterModal
						isOpen={isRegisterModal}
						onClose={onCloseRegisterModal}
					/>

					<Button
						theme='primary'
						size='small'
						onClick={onOpenLoginModal}
						data-testid='login-button'
					>
						{t('buttons.login')}
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
