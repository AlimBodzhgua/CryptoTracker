import { FC, useState, memo } from 'react';
import { Input } from 'components/UI/Input/Input';
import { Button } from 'components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { signInUser } from 'redux/actions/userActions';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { selectUserIsLoading } from 'redux/selectors/userSelectors';

import EmailIcon from 'assets/icons/email.svg';
import PasswordIcon from 'assets/icons/password.svg';
import EyeIcon from 'assets/icons/eye.svg';

import classnames from 'classnames';
import classes from './LoginForm.module.scss';

interface LoginFormProps {
	className?: string;
}

interface IFormInputs {
	email: string;
	password: string;
}

export const LoginForm: FC<LoginFormProps> = memo(({ className }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const isLoading = useAppSelector(selectUserIsLoading);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({
        mode: 'onSubmit',
    });

    const onTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit:SubmitHandler<IFormInputs> = (e) => {
        dispatch(signInUser({
            email: e.email,
            password: e.password,
        })).then(({ meta, payload }) => {
            if (meta.requestStatus === 'fulfilled') {
                localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(payload));
            }
        });
    };

    return (
        <form
            action=''
            className={classnames(classes.LoginForm, className)}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                control={control}
                name='email'
                defaultValue=''
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                    <Input
                        addonBefore={<EmailIcon className={classes.icon} />}
                        placeholder={t('Enter email...')}
                        className={classes.inputField}
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            {errors.email?.type === 'required' && (
                <div className={classes.message}>
                    {t('Please enter your email.')}
                </div>
            )}

            <Controller
                control={control}
                name='password'
                defaultValue=''
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                    <Input
                        addonBefore={<PasswordIcon className={classes.icon} />}
                        addonAfter={(
                            <EyeIcon
                                className={classes.iconRight}
                                onClick={onTogglePassword}
                            />
                        )}
                        placeholder={t('Enter password...')}
                        type={showPassword ? 'text' : 'password'}
                        className={classes.inputField}
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            {errors.password?.type === 'required' && (
                <div className={classes.message}>
                    {t('Please enter your password.')}
                </div>
            )}

            <Button
                className={classes.button}
                type='submit'
                disabled={isLoading}
            >
                {t('Login')}
            </Button>
        </form>
    );
});
