import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CurrencySwitcher } from './CurrencySwitcher';

const meta = {
    title: 'Components/CurrencySwitcher',
    component: CurrencySwitcher,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof CurrencySwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
