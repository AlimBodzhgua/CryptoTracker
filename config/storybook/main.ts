import { TransformOptions } from '@babel/core';
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
    stories: [
        '../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    framework: '@storybook/react-webpack5',
    addons: [
        '@storybook/addon-webpack5-compiler-swc',
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
        '@storybook/addon-webpack5-compiler-babel',
    ],
    docs: {
        autodocs: 'tag',
    },
};
export default config;
