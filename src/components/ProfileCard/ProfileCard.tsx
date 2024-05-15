import React, {
	ChangeEvent,
	useCallback,
	useEffect,
	useId,
	useState,
	memo,
} from 'react';
import { Input } from 'components/UI/Input/Input';
import { selectUser, selectUserIsLoading } from 'store/selectors/userSelectors';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Button, ButtonSize, ButtonTheme } from 'components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import {
	sendEmailVerificationMessage,
	updateUserProfile,
} from 'store/actions/userActions';

import { AppImage } from 'components/UI/AppImage/AppImage';
import { Skeleton } from 'components/UI/Skeleton/Skeleton';
import { ProfileCardSkeleton } from './ProfileCardSkeleton';
import UserDefaultImage from 'assets/userDefaultImage.jpg';
import ErrorIcon from 'assets/icons/error.svg';

import classnames from 'classnames';
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

	const [login, setLogin] = useState<string>('');
	const [imageUrl, setImageUrl] = useState<string>('');

	useEffect(() => {
		if (user) {
			setLogin(user.login);
			setImageUrl(user.imageUrl);
		}
	}, [user?.login, user?.imageUrl]);

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
		if (user) {
			const { meta } = await dispatch(
				updateUserProfile({ imageUrl, login }),
			);

			if (meta.requestStatus === 'fulfilled') {
				setEdit(false);
			}
		}
	}, [login, imageUrl]);

	const onGetVerificationMessage = useCallback(async () => {
		const { meta } = await dispatch(sendEmailVerificationMessage());
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
						theme={ButtonTheme.clear}
						size={ButtonSize.small}
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
				src={user!.imageUrl.length ? user!.imageUrl : UserDefaultImage}
				className={classes.profileImage}
				fallback={<Skeleton width="185" height="205" />}
			/>

			<div className={classes.data}>
				<div className={classes.dataWrapper}>
					<label htmlFor={`${id}-id`} className={classes.dataItem}>
						<span className={classes.dataText}>Id</span>
						<Input
							value={user!.id}
							className={classes.dataInput}
							id={`${id}-id`}
							disabled
						/>
					</label>

					<label htmlFor={`${id}-email`} className={classes.dataItem}>
						<span className={classes.dataText}>Email</span>
						<Input
							value={user!.email}
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
							theme={ButtonTheme.primary}
							className={classes.editBtn}
							onClick={onCancel}
							disabled={isLoading}
						>
							{t('Cancel')}
						</Button>
						<Button
							theme={ButtonTheme.secondary}
							className={classes.editBtn}
							onClick={onSave}
							disabled={isLoading}
						>
							{t('Save')}
						</Button>
					</>
				) : (
					<Button
						theme={ButtonTheme.primary}
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