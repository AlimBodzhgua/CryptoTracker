import { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'shared/UI/Button/Button';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { Input } from 'shared/UI/Input/Input';
import classnames from 'classnames';

import { resetUserPassword } from '../../../model/userActions';
import { selectUserIsLoading } from '../../../model/userSelectors';
import EmailIcon from '../../../assets/email.svg';
import classes from './PasswordResetForm.module.scss';


interface PasswordResetFormProps {
	title?: string;
	onSuccess?: () => void;
	onCancel?: () => void;
	className?: string;
}

type FormInputValues = {
	email: string;
};

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
	} = useForm<FormInputValues>({
		mode: 'onSubmit',
	});

	const onSubmit: SubmitHandler<FormInputValues> = async (e) => {
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
						theme='clear'
						className={classes.loginBtn}
						onClick={onSuccess}
					>
						{t('Login to account')}
					</Button>
				</p>
			)}
			<div className={classes.resetActions}>
				<Button
					theme='secondary'
					type='submit'
					className={classes.resetBtn}
					disabled={isLoading}
				>
					{t('Reset')}
				</Button>
				<Button
					theme='secondary'
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
