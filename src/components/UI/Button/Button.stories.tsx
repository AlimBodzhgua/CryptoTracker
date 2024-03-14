import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonTheme } from './Button';

const meta = {
    title: 'UI-Kit/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'button',
        theme: ButtonTheme.primary,
    },
};

export const Clear: Story = {
    args: {
        children: 'button',
        theme: ButtonTheme.clear,
    },
};
