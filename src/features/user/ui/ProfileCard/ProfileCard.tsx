import React, {
	ChangeEvent,
	useCallback,
	useId,
	useState,
	memo,
} from 'react';
import { Input } from 'shared/UI/Input/Input';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { Button } from 'shared/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { AppImage } from 'shared/UI/AppImage/AppImage';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import classnames from 'classnames';

import { selectUser, selectUserIsLoading } from '../../model/userSelectors';
import { sendVerificationMessage, updateUserProfile } from '../../model/userActions';

import UserDefaultImage from '../../assets/userDefaultImage.jpg';
import ErrorIcon from '../../assets/error.svg';

import { ProfileCardSkeleton } from './ProfileCardSkeleton';
import classes from './ProfileCard.module.scss';

interface ProfileCardProps {
	className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = memo(({ className }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const isLoading = useAppSelector(selectUserIsLoading);
	const id = useId();
	const [edit, setEdit] = useState<boolean>(false);

	const [login, setLogin] = useState<string | undefined>(user?.login);
	const [imageUrl, setImageUrl] = useState<string | undefined>(user?.imageUrl);

	const onEdit = useCallback(() => {
		setEdit(true);
	}, []);

	const onCancel = useCallback(() => {
		if (user) {
			setLogin(user.login);
			setImageUrl(user.imageUrl);
		}
		setEdit(false);
	}, []);

	const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLogin(e.target.value);
	};

	const onImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
		setImageUrl(e.target.value);
	};

	const onSave = useCallback(async () => {
		if (user && imageUrl && login) {
			const { meta } = await dispatch(
				updateUserProfile({ imageUrl, login }),
			);

			if (meta.requestStatus === 'fulfilled') {
				setEdit(false);
			}
		}
	}, [login, imageUrl]);

	const onGetVerificationMessage = useCallback(async () => {
		const { meta } = await dispatch(sendVerificationMessage());
		if (meta.requestStatus === 'fulfilled') {
			alert(
				'A confirmation message has been sent, confirm your email and re-login to your account',
			);
		}
	}, [dispatch]);

	const renderErrorIcon = useCallback(
		() => (
			<div className={classes.error}>
				<p className={classes.errorMsg}>
					{t('Your email is not veified')}
					<Button
						theme='clear'
						size='small'
						className={classes.verifyBtn}
						onClick={onGetVerificationMessage}
					>
						{t('click to get veification mail')}
					</Button>
				</p>
				<ErrorIcon className={classes.errorIcon} />
			</div>
		),
		[],
	);

	if (isLoading) {
		return <ProfileCardSkeleton />;
	}

	return (
		<div className={classnames(classes.ProfileCard, className)}>
			<AppImage
				src={user ? user.imageUrl : UserDefaultImage}
				className={classes.profileImage}
				fallback={<Skeleton width='185' height='205' />}
			/>

			<div className={classes.data}>
				<div className={classes.dataWrapper}>
					<label htmlFor={`${id}-id`} className={classes.dataItem}>
						<span className={classes.dataText}>Id</span>
						<Input
							value={user?.id}
							className={classes.dataInput}
							id={`${id}-id`}
							disabled
						/>
					</label>

					<label htmlFor={`${id}-email`} className={classes.dataItem}>
						<span className={classes.dataText}>Email</span>
						<Input
							value={user?.email}
							className={classes.dataInput}
							id={`${id}-email`}
							addonAfter={
								!user?.isEmailVerified && renderErrorIcon()
							}
							disabled
						/>
					</label>
				</div>

				<div className={classes.dataWrapper}>
					<label htmlFor={`${id}-login`} className={classes.dataItem}>
						<span className={classes.dataText}>Login</span>
						<Input
							placeholder={t('Enter your login')}
							className={classes.dataInput}
							fieldClassName={
								edit ? classes.inputField : undefined
							}
							disabled={!edit}
							value={login}
							onChange={onLoginChange}
							id={`${id}-login`}
						/>
					</label>
					<label htmlFor={`${id}-image`} className={classes.dataItem}>
						<span className={classes.dataText}>Image url</span>
						<Input
							placeholder={t('Enter your image url')}
							className={classes.dataInput}
							fieldClassName={
								edit ? classes.inputField : undefined
							}
							disabled={!edit}
							value={imageUrl}
							onChange={onImageUrlChange}
							id={`${id}-image`}
						/>
					</label>
				</div>
			</div>

			<div className={classes.profileActions}>
				{edit ? (
					<>
						<Button
							theme='primary'
							className={classes.editBtn}
							onClick={onCancel}
							disabled={isLoading}
						>
							{t('Cancel')}
						</Button>
						<Button
							theme='secondary'
							className={classes.editBtn}
							onClick={onSave}
							disabled={isLoading}
						>
							{t('Save')}
						</Button>
					</>
				) : (
					<Button
						theme='primary'
						className={classes.editBtn}
						onClick={onEdit}
					>
						{t('Edit')}
					</Button>
				)}
			</div>
		</div>
	);
});
