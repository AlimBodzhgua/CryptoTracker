import React from 'react';
import { useTranslation } from 'react-i18next';
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
            <p
                className={classes.title}
            >
                {t('An unexpected error occured')}
            </p>
            <button
                className={classes.reload}
                onClick={onReload}
            >
                {t('Reload the page')}
            </button>
        </div>
    );
};
