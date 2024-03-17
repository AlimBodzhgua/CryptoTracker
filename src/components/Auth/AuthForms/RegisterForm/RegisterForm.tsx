import {
    FC, useState, memo, useCallback,
} from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from 'components/UI/Input/Input';
import { Button } from 'components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { signUpUser } from 'redux/actions/userActions';
import { selectUserIsLoading } from 'redux/selectors/userSelectors';

import EmailIcon from 'assets/icons/email.svg';
import PasswordIcon from 'assets/icons/password.svg';
import EyeIcon from 'assets/icons/eye.svg';

import classnames from 'classnames';
import classes from './RegisterForm.module.scss';

interface RegisterFormProps {
    onSuccess?: () => void;
	className?: string;
}

interface IFormInputs {
	email: string;
	password: string;
}

const RegisterForm: FC<RegisterFormProps> = memo((props) => {
    const { onSuccess, className } = props;
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectUserIsLoading);
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

    const onSubmit: SubmitHandler<IFormInputs> = useCallback(async (e) => {
        const { meta, payload } = await dispatch(signUpUser({
            email: e.email,
            password: e.password,
        }));

        if (meta.requestStatus === 'fulfilled') {
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(payload));

            if (onSuccess) onSuccess();
        }
    }, [dispatch, onSuccess]);

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
                disabled={isLoading}
            >
                {t('Register')}
            </Button>
            <div>Already have an account? Sign in</div>
        </form>
    );
});

export default RegisterForm;
