import React from 'react';
import { Modal } from 'components/UI/Modal/Modal';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { RegisterFormAsync } from '../../AuthForms/RegisterForm/RegisterForm.async';

import classes from './RegisterModal.module.scss';

interface RegisterModalProps {
	isOpen: boolean;
	onClose: () => void;
	className?: string;
}

export const RegisterModal: React.FC<RegisterModalProps> = (props) => {
    const {
        isOpen,
        onClose,
        className,
    } = props;
    const { t } = useTranslation();

    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            className={classnames(classes.RegisterModal, className)}
        >
            <RegisterFormAsync
                onSuccess={onClose}
                title={t('Register')}
            />
        </Modal>
    );
};
