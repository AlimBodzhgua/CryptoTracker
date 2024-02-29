import type { Meta, StoryObj } from '@storybook/react';

import { AppLink } from './AppLink';

const meta = {
    title: 'UI-Kit/AppLink',
    component: AppLink,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'home',
        to: '/',
    },
};
