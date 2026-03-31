import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileCard } from 'features/user';
import { Page } from 'features/page';

import classnames from 'classnames';
import classes from './ProfilePage.module.scss';

interface ProfilePageProps {
	className?: string;
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
	const { t } = useTranslation();

	return (
		<Page className={classnames(classes.ProfilePage, className)}>
			<h1 className={classes.header}>{t('profile.title')}</h1>
			<ProfileCard />
		</Page>
	);
};

export default ProfilePage;
