/* import React from 'react';
import { Preview } from '@storybook/react';

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
    decorators: [],
};

export default preview; */
import { Preview } from '@storybook/react';

const preview: Preview = {
    parameters: {
        controls: {
            presetColors: [{ color: '#ff4785', title: 'Coral' }, 'rgba(0, 159, 183, 1)', '#fe4a49'],
        },
    },
};

export default preview;
