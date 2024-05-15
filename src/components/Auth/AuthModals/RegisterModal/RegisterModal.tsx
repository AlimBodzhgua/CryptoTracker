import { FC, Suspense } from 'react';
import { Modal } from 'components/UI/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { LoaderRing } from 'components/UI/LoaderRing/LoaderRing';

import classnames from 'classnames';
import { RegisterFormAsync } from '../../AuthForms/RegisterForm/RegisterForm.async';
import classes from './RegisterModal.module.scss';

interface RegisterModalProps {
	isOpen: boolean;
	onClose: () => void;
	className?: string;
}

export const RegisterModal: FC<RegisterModalProps> = (props) => {
	const { isOpen, onClose, className } = props;
	const { t } = useTranslation();

	return (
		<Modal
			onClose={onClose}
			isOpen={isOpen}
			className={classnames(classes.RegisterModal, className)}
		>
			<Suspense fallback={<LoaderRing />}>
				<RegisterFormAsync onSuccess={onClose} title={t('Register')} />
			</Suspense>
		</Modal>
	);
};