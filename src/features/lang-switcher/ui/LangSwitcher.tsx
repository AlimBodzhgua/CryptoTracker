import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/UI/Button/Button';
import classnames from 'classnames';

import GlobeIcon from '../assets/globe.svg';
import classes from './LangSwitcher.module.scss';

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
					className={classnames(
						classes.language,
						i18n.language === 'ru'
							? classes.activeRu
							: classes.inactiveRu,
					)}
				>
					Ru
				</span>
				<span className={classes.separator} />
				<span
					className={classnames(
						classes.language,
						i18n.language === 'en'
							? classes.activeEn
							: classes.inactiveEn,
					)}
				>
					En
				</span>
			</div>
		</Button>
	);
});
