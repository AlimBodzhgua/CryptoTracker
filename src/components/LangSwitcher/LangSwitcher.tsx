import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'components/UI/Button/Button';
import GlobeIcon from 'assets/globe.svg';
import classnames from 'classnames';
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
        <Button
            onClick={toggleLanguage}
            className={classnames(classes.LangSwitcher, className)}
            theme={ButtonTheme.clear}
        >
            <GlobeIcon className={classes.icon} />
            <div className={classes.languages}>
                <span
                    className={classnames(
                        classes.language,
                        i18n.language === 'ru' ? classes.activeRu : classes.inactiveRu,
                    )}
                >
                    Ru
                </span>
                <span className={classes.separator} />
                <span
                    className={classnames(
                        classes.language,
                        i18n.language === 'en' ? classes.activeEn : classes.inactiveEn,
                    )}
                >
                    En
                </span>
            </div>
        </Button>
    );
};
