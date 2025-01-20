import { FC } from 'react';
import { Page } from 'components/UI/Page/Page';
import { useTranslation } from 'react-i18next';
import LockIcon from 'assets/icons/lock.svg'
import classnames from 'classnames';
import classes from './PageRequireAuth.module.scss';

interface PageRequireAuthProps {
	className?: string;
}

export const PageRequireAuth: FC<PageRequireAuthProps> = ({ className }) => {
	const { t } = useTranslation();

	return (
		<Page className={classnames(classes.PageRequierAuth, className)}>
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
		</Page>
	);
};
