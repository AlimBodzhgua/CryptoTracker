import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import classes from './LangSwitcher.module.scss';

interface LangSwitcherProps {
	className?: string;
}

export const LangSwitcher: React.FC<LangSwitcherProps> = ({ className }) => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <button
            onClick={toggleLanguage}
            className={classnames(classes.LangSwitcher, className)}
        >
            {t('Language')}
        </button>
    );
};
