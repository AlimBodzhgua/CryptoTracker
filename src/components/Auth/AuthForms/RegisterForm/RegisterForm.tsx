import { FC, useState, memo } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from 'components/UI/Input/Input';
import { Button } from 'components/UI/Button/Button';
import { useAppDispatch } from 'hooks/redux';

import EmailIcon from 'assets/icons/email.svg';
import PasswordIcon from 'assets/icons/password.svg';
import EyeIcon from 'assets/icons/eye.svg';

import classnames from 'classnames';
import { signUpUser } from 'redux/actions/userActions';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import classes from './RegisterForm.module.scss';
import meta from './RegisterForm.stories';

interface RegisterFormProps {
	className?: string;
}

interface IFormInputs {
	email: string;
	password: string;
}

export const RegisterForm: FC<RegisterFormProps> = memo(({ className }) => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({
        mode: 'onBlur',
    });

    const onTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit: SubmitHandler<IFormInputs> = (e) => {
        dispatch(signUpUser({
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
            onSubmit={(handleSubmit(onSubmit))}
            className={classnames(classes.RegisterForm, className)}
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
                rules={{ required: true, minLength: 6 }}
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
            >
                {t('Register')}
            </Button>
            <div>Already have an account? Sign in</div>
        </form>
    );
});
