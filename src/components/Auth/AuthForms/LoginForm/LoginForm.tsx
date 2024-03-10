import { FC, useState, memo } from 'react';
import { Input } from 'components/UI/Input/Input';
import { Button } from 'components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';

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
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>({
        mode: 'onSubmit',
    });

    const onTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onSubmit:SubmitHandler<IFormInputs> = (e) => {
        console.log(e);
    };

    return (
        <form
            action=''
            className={classnames(classes.LoginForm, className)}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                {...register('email', {
                    required: {
                        value: true,
                        message: t('Please enter your email.'),
                    },
                })}
                addonBefore={<EmailIcon className={classes.icon} />}
                placeholder={t('Enter email...')}
                value={email}
                onChange={onEmailChange}
                className={classes.inputField}
            />
            {errors.email
				&& <div className={classes.message}>{errors.email.message}</div>}

            <Input
                {...register('password', {
                    required: {
                        value: true,
                        message: t('Please enter your password.'),
                    },
                })}
                addonBefore={<PasswordIcon className={classes.icon} />}
                addonAfter={(
                    <EyeIcon
                        className={classes.iconRight}
                        onClick={onTogglePassword}
                    />
                )}
                placeholder={t('Enter password...')}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={onPasswordChange}
                className={classes.inputField}
            />
            {errors.password
				&& <div className={classes.message}>{errors.password.message}</div>}

            <Button className={classes.button}>
                {t('Login')}
            </Button>
        </form>
    );
});
