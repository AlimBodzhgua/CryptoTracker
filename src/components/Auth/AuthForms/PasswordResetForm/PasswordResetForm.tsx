import { FC, memo, useState } from 'react';
import { Button, ButtonTheme } from 'components/UI/Button/Button';
import { resetUserPassword } from 'store/actions/userActions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Input } from 'components/UI/Input/Input';
import { selectUserIsLoading } from 'store/selectors/userSelectors';

import EmailIcon from 'assets/icons/email.svg';

import classnames from 'classnames';
import classes from './PasswordResetForm.module.scss';

interface PasswordResetFormProps {
    title?: string;
    onSuccess?: () => void;
    onCancel?: () => void;
    className?: string;
}

interface IFormInputs {
    email: string;
}

const PasswordResetForm: FC<PasswordResetFormProps> = memo((props) => {
    const {
        title,
        onSuccess,
        onCancel,
        className,
    } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const isLoading = useAppSelector(selectUserIsLoading);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IFormInputs>({
        mode: 'onSubmit',
    });

    const onSubmit: SubmitHandler<IFormInputs> = async (e) => {
        const { meta } = await dispatch(resetUserPassword(e.email));

        if (meta.requestStatus === 'fulfilled') {
            setIsSuccess(true);
        } else if (meta.requestStatus === 'rejected') {
            alert('User with such email does not exist');
        }
    };

    return (
        <form
            className={classnames(classes.PasswordResetForm, className)}
            onSubmit={handleSubmit(onSubmit)}
            data-testid='reset-form'
        >
            <h2 className={classes.title}>{title}</h2>
            <Input
                addonBefore={<EmailIcon className={classes.icon} />}
                className={classes.inputField}
                placeholder={t('Enter you email...')}
                {...register('email', { required: true })}
            />

            {errors.email?.type === 'required' && (
                <div className={classes.errorMessage}>
                    {t('Please enter your email.')}
                </div>
            )}
            {isSuccess && (
                <p className={classes.message}>
                    {t('An email has been sent to you to reset your password.')}
                    <Button
                        theme={ButtonTheme.clear}
                        className={classes.loginBtn}
                        onClick={onSuccess}
                    >
                        {t('Login to account')}
                    </Button>
                </p>
            )}
            <div className={classes.resetActions}>
                <Button
                    theme={ButtonTheme.secondary}
                    type='submit'
                    className={classes.resetBtn}
                    disabled={isLoading}
                >
                    {t('Reset')}
                </Button>
                <Button
                    theme={ButtonTheme.secondary}
                    className={classes.cancelBtn}
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    {t('Cancel')}
                </Button>
            </div>
        </form>
    );
});

export default PasswordResetForm;
