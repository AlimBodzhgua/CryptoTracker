import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ConverterPage from './ConverterPage';

const meta = {
    title: 'pages/ConverterPage',
    component: ConverterPage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof ConverterPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};