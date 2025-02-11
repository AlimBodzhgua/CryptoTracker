import { FC, useState, memo, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Input } from 'components/UI/Input/Input';
import { Button } from 'components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { USER_LOCALSTORAGE_KEY } from 'constants/localStorage';
import { signUpUser } from 'store/actions/userActions';
import { useSearchParams } from 'react-router-dom';
import { userActions } from 'store/slices/userSlice';
import {
	selectUserError,
	selectUserIsLoading,
} from 'store/selectors/userSelectors';

import EmailIcon from 'assets/icons/email.svg';
import PasswordIcon from 'assets/icons/password.svg';
import EyeIcon from 'assets/icons/eye.svg';

import classnames from 'classnames';
import classes from './RegisterForm.module.scss';

interface RegisterFormProps {
	onSuccess?: () => void;
	title?: string;
	className?: string;
}

type FormInputValues = {
	email: string;
	password: string;
}

const RegisterForm: FC<RegisterFormProps> = memo((props) => {
	const { onSuccess, title, className } = props;
	const { t } = useTranslation();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [_, setSearchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectUserIsLoading);
	const error = useAppSelector(selectUserError);
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormInputValues>({
		mode: 'onBlur',
	});

	const onTogglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	const onSubmit: SubmitHandler<FormInputValues> = async (e) => {
		const { meta, payload } = await dispatch(
			signUpUser({
				email: e.email,
				password: e.password,
			}),
		);

		if (meta.requestStatus === 'fulfilled') {
			localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(payload));

			if (onSuccess) onSuccess();
		}
	};

	const onMoveToLogin = () => {
		setSearchParams({ modal: 'login' });
		dispatch(userActions.clearError());
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={classnames(classes.RegisterForm, className)}
			data-testid='register-form'
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
						onClick={onTogglePassword}
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
					{t('User with such email already exist.')}
				</div>
			)}

			<Button
				className={classes.button}
				disabled={isLoading}
				type='submit'
			>
				{t('Register')}
			</Button>
			<div className={classes.haveAccount}>
				{t('Already have an account?')}
				<Button
					theme='clear'
					onClick={onMoveToLogin}
					className={classes.loginBtn}
					type='reset'
				>
					{t('Sign In')}
				</Button>
			</div>
		</form>
	);
});

export default RegisterForm;
