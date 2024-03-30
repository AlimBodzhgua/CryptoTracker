import type { Meta, StoryObj } from '@storybook/react';

import { Message } from './Message';

const meta = {
    title: 'UI-Kit/Message',
    component: Message,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ErrorType: Story = {
    args: {
        type: 'error',
        text: 'error message',
    },
};

export const ErrorWithIcon: Story = {
    args: {
        type: 'error',
        text: 'error message',
        withIcon: true,
    },
};

export const WarningType: Story = {
    args: {
        type: 'warn',
        text: 'waring message',
    },
};

export const WarningWithIcon: Story = {
    args: {
        type: 'warn',
        text: 'waring message',
        withIcon: true,
    },
};

export const SuccessType: Story = {
    args: {
        type: 'success',
        text: 'success message',
    },
};

export const SuccessWithIcon: Story = {
    args: {
        type: 'success',
        text: 'success message',
        withIcon: true,
    },
};