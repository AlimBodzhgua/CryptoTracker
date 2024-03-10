import React from 'react';
import { Modal } from 'components/UI/Modal/Modal';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { RegisterForm } from '../../AuthForms/RegisterForm/RegisterForm';
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
            <h2 className={classes.header}>{t('Register')}</h2>
            <RegisterForm />
        </Modal>
    );
};
