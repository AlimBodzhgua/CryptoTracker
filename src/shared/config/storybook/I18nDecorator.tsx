import { Suspense, useEffect } from 'react';
import { Decorator } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';

import i18n from 'shared/config/i18n/i18nForStorybook';

export const I18nDecorator: Decorator = (Story, { globals }) => {
	const { locale } = globals ?? 'en';

	useEffect(() => {
		const normalizedLocale = locale.startsWith('en') ? 'en' : 'ru';
		i18n.changeLanguage(normalizedLocale);
	}, [locale]);

	return (
		<Suspense fallback={<div>loading translations...</div>}>
			<I18nextProvider i18n={i18n}>
				<Story />
			</I18nextProvider>
		</Suspense>
	);
};
