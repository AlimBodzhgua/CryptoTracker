import { Preview } from '@storybook/react';
import { BrowserDecorator } from '../../src/shared/config/storybook/BrowserDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator';
import { I18nDecorator } from '../../src/shared/config/storybook/I18nDecorator';
import { StoreDecorator } from '../../src/shared/config/storybook/StoreDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator';
import '../../src/shared/config/i18n/i18n';

const preview: Preview = {
	parameters: {
		darkMode: {
			current: 'dark',
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	globalTypes: {
		locale: {
			name: 'locale',
			defaultValue: 'en',
			description: 'Internationalization locale',
			toolbar: {
				icon: 'globe',
				items: [
					{ value: 'en', title: 'English' },
					{ value: 'ru', title: 'Russian' },
				],
				showName: true,
			},
		},
	},
	decorators: [
		BrowserDecorator,
		StyleDecorator,
		I18nDecorator,
		SuspenseDecorator,
		StoreDecorator({
			user: {},
			currency: {},
			coins: {},
		}),
	],
};

export default preview;
