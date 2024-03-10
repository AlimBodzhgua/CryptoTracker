import {
    FC, useState, memo, ChangeEvent,
} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from 'components/UI/Input/Input';
import { Button } from 'components/UI/Button/Button';

import EmailIcon from 'assets/icons/email.svg';
import PasswordIcon from 'assets/icons/password.svg';
import EyeIcon from 'assets/icons/eye.svg';

import classnames from 'classnames';
import classes from './RegisterForm.module.scss';

interface RegisterFormProps {
	className?: string;
}

interface IFormInputs {
	email: string;
	password: string;
}

export const RegisterForm: FC<RegisterFormProps> = memo(({ className }) => {
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

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onSubmit: SubmitHandler<IFormInputs> = (e) => {
        console.log(e);
    };

    return (
        <form
            action=''
            onSubmit={handleSubmit(onSubmit)}
            className={classnames(classes.RegisterForm, className)}
        >
            <Input
                addonBefore={<EmailIcon className={classes.icon} />}
                placeholder={t('Enter email...')}
                value={email}
                className={classes.inputField}
                {...register('email', {
                    required: {
                        value: true,
                        message: t('Please enter your email.'),
                    },
                })}
                onChange={onEmailChange}
            />
            {errors.email
				&& <div className={classes.message}>{errors.email.message}</div>}

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
                value={password}
                className={classes.inputField}
                {...register('password', {
                    required: {
                        value: true,
                        message: t('Please enter your password.'),
                    },
                    minLength: {
                        value: 8,
                        message: t('Passwrod should contain at least 8 scharacters'),
                    },
                })}
                onChange={onPasswordChange}
            />
            {errors.password
				&& <div className={classes.message}>{errors.password.message}</div>}

            <Button
                className={classes.button}
                type='submit'
            >
                {t('Register')}
            </Button>
            <div>Already have an account? Sign in</div>
        </form>
    );
});
