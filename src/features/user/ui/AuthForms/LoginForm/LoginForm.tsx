import { FC, useState, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from 'shared/UI/Input/Input';
import { Button } from 'shared/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants/localStorage';
import classnames from 'classnames';
import { signInUser, signInWithGoogle } from '../../../model/userActions';
import { userSelectors, userActions } from '../../../model/userSlice';

import EmailIcon from '../../../assets/email.svg';
import PasswordIcon from '../../../assets/password.svg';
import EyeIcon from '../../../assets/eye.svg';
import GoogleIcon from '../../../assets/google.svg';
import classes from './LoginForm.module.scss';

interface LoginFormProps {
	onSuccess?: () => void;
	onForget?: () => void;
	title?: string;
	className?: string;
}

type FormInputValues = {
	email: string;
	password: string;
}

const LoginForm: FC<LoginFormProps> = memo((props) => {
	const { title, onSuccess, onForget, className } = props;
	const { t } = useTranslation();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [_, setSearchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(userSelectors.selectUserIsLoading);
	const error = useAppSelector(userSelectors.selectUserError);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormInputValues>({
		mode: 'onSubmit',
	});

	const onToggleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	const onSubmit: SubmitHandler<FormInputValues> = async (e) => {
		const { meta, payload } = await dispatch(
			signInUser({ email: e.email, password: e.password }),
		);

		if (meta.requestStatus === 'fulfilled') {
			localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(payload));

			if (onSuccess) onSuccess();
		}
	};

	const onForgetPassword = () => {
		if (onForget) {
			onForget();
		}
	};

	const onLoginWithGoogle = async () => {
		const { meta, payload } = await dispatch(signInWithGoogle());

		if (meta.requestStatus === 'fulfilled') {
			localStorage.setItem(
				USER_LOCALSTORAGE_KEY,
				JSON.stringify(payload),
			);

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
			<Input
				addonBefore={<EmailIcon className={classes.icon} />}
				placeholder={t('Enter email...')}
				className={classes.inputField}
				{...register('email', { required: true })}
			/>
			{errors.email?.type === 'required' && (
				<div className={classes.message}>
					{t('Please enter your email.')}
				</div>
			)}

			<Input
				addonBefore={<PasswordIcon className={classes.icon} />}
				addonAfter={
					<EyeIcon
						className={classes.iconRight}
						onClick={onToggleShowPassword}
					/>
				}
				placeholder={t('Enter password...')}
				type={showPassword ? 'text' : 'password'}
				className={classes.inputField}
				{...register('password', { required: true })}
			/>
			{errors.password?.type === 'required' && (
				<div className={classes.message}>
					{t('Please enter your password.')}
				</div>
			)}

			{error && (
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
				theme='secondary'
				size='small'
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
				theme='clear'
				size='small'
				className={classes.forgetBtn}
				type='reset'
			>
				{t('Forgot Password?')}
			</Button>
			<div className={classes.notRegistered}>
				{t('Don`t have an account?')}
				<Button
					theme='clear'
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
