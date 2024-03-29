import { FC } from 'react';
import { Page } from 'components/UI/Page/Page';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import classes from './PageRequierAuth.module.scss';

interface PageRequierAuthProps {
	className?: string;
}

export const PageRequierAuth: FC<PageRequierAuthProps> = ({ className }) => {
    const { t } = useTranslation();

    return (
        <Page className={classnames(classes.PageRequierAuth, className)}>
            <h1 className={classes.header}>
                {t('This page require auth.')}
            </h1>
            <div className={classes.redirectText}>
                {t('Soon you will redirect to the main page.')}
            </div>
            <div className={classes.text}>
                {t('Please register or log in your account to access the page.')}
            </div>
        </Page>
    );
};
