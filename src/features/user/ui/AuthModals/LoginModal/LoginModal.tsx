import { FC, Suspense, useCallback, useMemo, useState } from 'react';
import { Modal } from 'shared/UI/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { LoaderRing } from 'shared/UI/LoaderRing/LoaderRing';
import classnames from 'classnames';
import { LoginFormAsync } from '../../AuthForms/LoginForm/LoginForm.async';
import { PasswordResetFormAsync } from '../../AuthForms/PasswordResetForm/PasswordResetForm.async';

import classes from './LoginModal.module.scss';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	className?: string;
}

type ActiveFormType = 'loginForm' | 'resetForm';

export const LoginModal: FC<LoginModalProps> = (props) => {
	const { isOpen, onClose, className } = props;
	const { t } = useTranslation();
	const [activeForm, setActiveForm] = useState<ActiveFormType>('loginForm');

	const onForget = useCallback(() => {
		setActiveForm('resetForm');
	}, []);

	const backToLoginForm = useCallback(() => {
		setActiveForm('loginForm');
	}, []);

	const ActiveForms: Record<ActiveFormType, JSX.Element> = useMemo(
		() => ({
			loginForm: (
				<LoginFormAsync
					title={t('forms.login')}
					onSuccess={onClose}
					onForget={onForget}
				/>
			),
			resetForm: (
				<PasswordResetFormAsync
					title={t('forms.password_reset')}
					onSuccess={backToLoginForm}
					onCancel={backToLoginForm}
				/>
			),
		}),
		[onClose, onForget, backToLoginForm, t],
	);

	return (
		<Modal
			onClose={onClose}
			isOpen={isOpen}
			className={classnames(classes.LoginModal, className)}
		>
			<Suspense fallback={<LoaderRing />}>
				{ActiveForms[activeForm]}
			</Suspense>
		</Modal>
	);
};
