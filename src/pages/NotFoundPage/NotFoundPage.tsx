import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PageLayout } from 'shared/UI/PageLayout/PageLayout';
import classes from './NotFoundPage.module.scss';

export const NotFoundPage: FC = () => {
	const { t } = useTranslation();

	return (
		<PageLayout className={classes.NotFoundPage}>
			<h1>{t('errors.not_found_page')}</h1>
		</PageLayout>
	);
};