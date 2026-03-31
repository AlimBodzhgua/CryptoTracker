import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import LockIcon from './assets/lock.svg';
import classes from './PageRequireAuth.module.scss';
import { PageLayout } from '../PageLayout/PageLayout';

interface PageRequireAuthProps {
	className?: string;
}

export const PageRequireAuth: FC<PageRequireAuthProps> = ({ className }) => {
	const { t } = useTranslation();

	return (
		<PageLayout className={classnames(classes.PageRequierAuth, className)}>
			<LockIcon className={classes.lockIcon} />
			<h2 className={classes.header}>
				{t('messages.require_auth')}
			</h2>
			<div className={classes.redirectText}>
				{t('messages.redirect_to_main')}
			</div>
			<div className={classes.text}>
				{t('messages.register_or_login_account')}
			</div>
		</PageLayout>
	);
};
