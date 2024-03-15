import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './Skeleton';

const meta = {
    title: 'UI-Kit/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        width: 45,
        height: 45,
    },
};

export const Rounded: Story = {
    args: {
        width: 45,
        height: 45,
        radius: '50%',
    },
};
