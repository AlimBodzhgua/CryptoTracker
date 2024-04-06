import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'config/storybook/StoreDecorator';
import { LoginModal } from './LoginModal';

const meta = {
    title: 'components/LoginModal',
    component: LoginModal,
    parameters: {
        layout: 'centered',
        loki: { skip: true },
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof LoginModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        isOpen: true,
        onClose: () => console.log('close window'),
    },
};

export const IsLoading: Story = {
    args: {
        isOpen: true,
        onClose: () => console.log('close window'),
    },
    decorators: StoreDecorator({
        user: {
            isLoading: true,
        },
    }),
};