import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PasswordResetForm from './PasswordResetForm';

const meta = {
    title: 'Components/PasswordResetForm',
    component: PasswordResetForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof PasswordResetForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
