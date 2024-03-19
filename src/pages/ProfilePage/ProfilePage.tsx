import React from 'react';
import { ProfileCard } from 'components/ProfileCard/ProfileCard';
import { Page } from 'components/UI/Page/Page';

import classnames from 'classnames';
import classes from './ProfilePage.module.scss';

interface ProfilePageProps {
	className?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => (
    <Page className={classnames(classes.ProfilePage, className)}>
        <h1 className={classes.header}>Profile</h1>
        <ProfileCard />
    </Page>
);

export default ProfilePage;
