import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import LockIcon from './assets/lock.svg'
import classes from './PageRequireAuth.module.scss';
import { PageLayout } from '../PageLayout/PageLayout';

interface PageRequireAuthProps {
	className?: string;
}

export const PageRequireAuth: FC<PageRequireAuthProps> = ({ className }) => {
	const { t } = useTranslation();

	return (
		<PageLayout className={classnames(classes.PageRequierAuth, className)}>
			<LockIcon className={classes.lockIcon}/>
			<h2 className={classes.header}>
				{t('This page require auth.')}
			</h2>
			<div className={classes.redirectText}>
				{t('Soon you will redirect to the main page.')}
			</div>
			<div className={classes.text}>
				{t('Please register or log in your account to access the page.')}
			</div>
		</PageLayout>
	);
};
