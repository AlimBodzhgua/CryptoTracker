import { Preview } from '@storybook/react';
import { BrowserDecorator } from '../../src/config/storybook/BrowserDecorator';
import { StyleDecorator } from '../../src/config/storybook/StyleDecorator';
import { I18nDecorator } from '../../src/config/storybook/I18nDecorator';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    globalTypes: {
        locale: {
            name: 'locale',
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
    ],
};

export default preview;
