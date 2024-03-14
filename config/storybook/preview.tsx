import { Preview } from '@storybook/react';
import { BrowserDecorator } from '../../src/config/storybook/BrowserDecorator';
import { StyleDecorator } from '../../src/config/storybook/StyleDecorator';
import { StoreDecorator } from '../../src/config/storybook/StoreDecorator';
import { I18nDecorator } from '../../src/config/storybook/I18nDecorator';

const preview: Preview = {
    parameters: {
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
        StoreDecorator({
            coins: [],
            currency: {}
        }),
    ],
};

export default preview;