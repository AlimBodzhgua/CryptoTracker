import {
    FC, useState, memo, useCallback,
} from 'react';
import { Input } from 'components/UI/Input/Input';
import { Button, ButtonSize, ButtonTheme } from 'components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { signInUser, signInWithGoogle } from 'store/actions/userActions';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { selectUserError, selectUserIsLoading } from 'store/selectors/userSelectors';
import { useSearchParams } from 'react-router-dom';
import { userActions } from 'store/slices/userSlice';

import EmailIcon from 'assets/icons/email.svg';
import PasswordIcon from 'assets/icons/password.svg';
import EyeIcon from 'assets/icons/eye.svg';
import GoogleIcon from 'assets/icons/google.svg';

import classnames from 'classnames';
import classes from './LoginForm.module.scss';

interface LoginFormProps {
    onSuccess?: () => void;
    onForget?: () => void;
    title?: string;
	className?: string;
}

interface IFormInputs {
	email: string;
	password: string;
}

const LoginForm: FC<LoginFormProps> = memo((props) => {
    const {
        title,
        onSuccess,
        onForget,
        className,
    } = props;
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [_, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectUserIsLoading);
    const error = useAppSelector(selectUserError);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({
        mode: 'onSubmit',
    });

    const onToggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit:SubmitHandler<IFormInputs> = useCallback(async (e) => {
        const { meta, payload } = await dispatch(signInUser({
            email: e.email,
            password: e.password,
        }));

        if (meta.requestStatus === 'fulfilled') {
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(payload));

            if (onSuccess) onSuccess();
        }
    }, [dispatch, onSuccess]);

    const onForgetPassword = () => {
        if (onForget) {
            onForget();
        }
    };

    const onLoginWithGoogle = async () => {
        const { meta, payload } = await dispatch(signInWithGoogle());

        if (meta.requestStatus === 'fulfilled') {
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(payload));

            if (onSuccess) onSuccess();
        }
    };

    const onMoveToRegister = () => {
        setSearchParams({ modal: 'register' });
        dispatch(userActions.clearError());
    };

    return (
        <form
            className={classnames(classes.LoginForm, className)}
            onSubmit={handleSubmit(onSubmit)}
            data-testid='login-form'
        >
            <h2 className={classes.title}>{title}</h2>
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
                                onClick={onToggleShowPassword}
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

            {error
                && (
                    <div className={classes.message}>
                        {t('Wrong password or email.')}
                    </div>
                )}

            <Button
                className={classes.button}
                type='submit'
                disabled={isLoading}
            >
                {t('Login')}
            </Button>
            <Button
                theme={ButtonTheme.secondary}
                size={ButtonSize.small}
                onClick={onLoginWithGoogle}
                className={classes.googleBtn}
                disabled={isLoading}
                type='reset'
            >
                <GoogleIcon className={classes.googleIcon} />
                {t('Log In with Google')}
            </Button>
            <Button
                onClick={onForgetPassword}
                theme={ButtonTheme.clear}
                size={ButtonSize.small}
                className={classes.forgetBtn}
                type='reset'
            >
                {t('Forgot Password?')}
            </Button>
            <div className={classes.notRegistered}>
                {t('Don`t have an account?')}
                <Button
                    theme={ButtonTheme.clear}
                    onClick={onMoveToRegister}
                    className={classes.registerBtn}
                    type='reset'
                >
                    {t('Sign Up')}
                </Button>
            </div>
        </form>
    );
});

export default LoginForm;
