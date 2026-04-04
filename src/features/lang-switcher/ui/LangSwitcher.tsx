import type { FC } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/UI/Button/Button';
import classnames from 'classnames';

import classes from './LangSwitcher.module.scss';
import GlobeIcon from '../assets/globe.svg';

interface LangSwitcherProps {
	className?: string;
}

export const LangSwitcher: FC<LangSwitcherProps> = memo(({ className }) => {
	const { i18n } = useTranslation();

	const toggleLanguage = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<Button
			onClick={toggleLanguage}
			className={classnames(classes.LangSwitcher, className)}
			theme='clear'
			data-testid='switch-button'
		>
			<GlobeIcon className={classes.icon} />
			<div className={classes.languages}>
				<span
					className={classnames(classes.language, {
						[classes.active]: i18n.language === 'ru',
					})}
				>
					Ru
				</span>
				<span className={classes.separator} />
				<span
					className={classnames(classes.language, {
						[classes.active]: i18n.language === 'en',
					})}
				>
					En
				</span>
			</div>
		</Button>
	);
});
