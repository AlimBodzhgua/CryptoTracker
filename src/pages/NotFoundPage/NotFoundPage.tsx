import React from 'react';
import { PageLayout } from 'shared/UI/PageLayout/PageLayout';
import classes from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => (
	<PageLayout className={classes.NotFoundPage}>
		<h1>Page not found</h1>
	</PageLayout>
);
