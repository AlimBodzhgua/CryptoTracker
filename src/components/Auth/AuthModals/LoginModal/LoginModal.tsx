import React from 'react';
import { Modal } from 'components/UI/Modal/Modal';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { LoginForm } from '../../AuthForms/LoginForm/LoginForm';
import classes from './LoginModal.module.scss';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	className?: string;
}

export const LoginModal: React.FC<LoginModalProps> = (props) => {
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
            className={classnames(classes.LoginModal, className)}
        >
            <h2 className={classes.header}>{t('Login')}</h2>
            <LoginForm />
        </Modal>
    );
};
