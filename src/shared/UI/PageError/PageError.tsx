import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/UI/Button/Button';
import classnames from 'classnames';

import classes from './PageError.module.scss';

interface PageErrorProps {
	className?: string;
}

export const PageError: FC<PageErrorProps> = ({ className }) => {
	const { t } = useTranslation();

	const onReload = () => location.reload();

	return (
		<div className={classnames(classes.PageError, className)}>
			<p className={classes.title}>{t('errors.unexpected_general')}</p>
			<Button
				className={classes.reload}
				onClick={onReload}
				theme='secondary'
				size='lg'
			>
				{t('buttons.reload_page')}
			</Button>
		</div>
	);
};
