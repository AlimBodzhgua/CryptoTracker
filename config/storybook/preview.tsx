import React from 'react';
import { Preview } from '@storybook/react';
import { BrowserDecorator } from '../../src/config/storybook/BrowserDecorator';
import { StyleDecorator } from '../../src/config/storybook/StyleDecorator';

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
    decorators: [
        BrowserDecorator,
        StyleDecorator,
    ],
};

export default preview;
