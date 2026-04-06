import type { FC, ChangeEvent } from 'react';

import { useId, useState } from 'react';
import { Input } from 'shared/UI/Input/Input';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { Button } from 'shared/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { AppImage } from 'shared/UI/AppImage/AppImage';
import { Skeleton } from 'shared/UI/Skeleton/Skeleton';
import classnames from 'classnames';

import { userSelectors } from '../../model/userSlice';
import { sendVerificationMessage, updateUserProfile } from '../../model/userActions';

import UserDefaultImage from '../../assets/userDefaultImage.jpg';
import ErrorIcon from '../../assets/error.svg';

import { ProfileCardSkeleton } from './ProfileCardSkeleton';
import classes from './ProfileCard.module.scss';

interface ProfileCardProps {
	className?: string;
}

export const ProfileCard: FC<ProfileCardProps> = ({ className }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const user = useAppSelector(userSelectors.selectUser);
	const isLoading = useAppSelector(userSelectors.selectUserIsLoading);
	const id = useId();
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const [login, setLogin] = useState<string | undefined>(user?.login);
	const [imageUrl, setImageUrl] = useState<string | undefined>(user?.imageUrl);

	const onEdit = () => setIsEdit(true);

	const onCancel = () => {
		if (user) {
			setLogin(user.login);
			setImageUrl(user.imageUrl);
		}
		setIsEdit(false);
	};

	const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLogin(e.target.value);
	};

	const onImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
		setImageUrl(e.target.value);
	};

	const onSave = async () => {
		if (user && imageUrl && login) {
			const { meta } = await dispatch(
				updateUserProfile({ imageUrl, login }),
			);

			if (meta.requestStatus === 'fulfilled') {
				setIsEdit(false);
			}
		}
	};

	const onGetVerificationMessage = async () => {
		const { meta } = await dispatch(sendVerificationMessage());
		if (meta.requestStatus === 'fulfilled') {
			alert(
				'A confirmation message has been sent, confirm your email and re-login to your account',
			);
		}
	};

	const renderErrorIcon = () => (
		<div className={classes.error}>
			<p className={classes.errorMsg}>
				{t('messages.email_not_verified')}
				<Button
					theme='clear'
					size='sm'
					className={classes.verifyBtn}
					onClick={onGetVerificationMessage}
				>
					{t('messages.click_to_verify')}
				</Button>
			</p>
			<ErrorIcon className={classes.errorIcon} />
		</div>
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
						<span className={classes.dataText}>{t('profile.email')}</span>
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
						<span className={classes.dataText}>{t('profile.login')}</span>
						<Input
							placeholder={t('placeholders.enter_login')}
							className={classes.dataInput}
							fieldClassName={
								isEdit ? classes.inputField : undefined
							}
							disabled={!isEdit}
							value={login}
							onChange={onLoginChange}
							id={`${id}-login`}
						/>
					</label>
					<label htmlFor={`${id}-image`} className={classes.dataItem}>
						<span className={classes.dataText}>{t('profile.image_url')}</span>
						<Input
							placeholder={t('placeholders.enter_image_url')}
							className={classes.dataInput}
							fieldClassName={
								isEdit ? classes.inputField : undefined
							}
							disabled={!isEdit}
							value={imageUrl}
							onChange={onImageUrlChange}
							id={`${id}-image`}
						/>
					</label>
				</div>
			</div>

			<div className={classes.profileActions}>
				{isEdit ? (
					<>
						<Button
							theme='red'
							className={classes.editBtn}
							onClick={onCancel}
							isLoading={isLoading}
						>
							{t('buttons.cancel')}
						</Button>
						<Button
							theme='white'
							className={classes.editBtn}
							onClick={onSave}
							isLoading={isLoading}
						>
							{t('buttons.save')}
						</Button>
					</>
				) : (
					<Button
						theme='secondary'
						className={classes.editBtn}
						onClick={onEdit}
					>
						{t('buttons.edit')}
					</Button>
				)}
			</div>
		</div>
	);
};
