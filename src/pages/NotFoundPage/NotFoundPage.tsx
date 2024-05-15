import React from 'react';
import { Page } from 'components/UI/Page/Page';
import classes from './NotFoundPage.module.scss';

const NotFoundPage: React.FC = () => (
	<Page className={classes.NotFoundPage}>
		<h1>Page not found</h1>
	</Page>
);

export default NotFoundPage;
