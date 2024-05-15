import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'components/UI/Button/Button';

import classnames from 'classnames';
import classes from './PageError.module.scss';

interface PageErrorProps {
	className?: string;
}

export const PageError: React.FC<PageErrorProps> = (props) => {
	const { className } = props;
	const { t } = useTranslation();

	const onReload = () => location.reload();

	return (
		<div className={classnames(classes.PageError, className)}>
			<p className={classes.title}>{t('An unexpected error occured')}</p>
			<Button
				className={classes.reload}
				onClick={onReload}
				theme={ButtonTheme.secondary}
			>
				{t('Reload the page')}
			</Button>
		</div>
	);
};
