import React from 'react';
import classnames from 'classnames';
import classes from './ProfilePage.module.scss';

interface ProfilePageProps {
	className?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => (
    <div className={classnames(classes.ProfilePage, className)}>
        ProfilePage
    </div>
);

export default ProfilePage;
