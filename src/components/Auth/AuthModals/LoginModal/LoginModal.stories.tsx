import type { Meta, StoryObj } from '@storybook/react';

import { LoginModal } from './LoginModal';
import { StoreDecorator } from 'config/storybook/StoreDecorator';

const meta = {
    title: 'components/LoginModal',
    component: LoginModal,
    parameters: {
        layout: 'centered',
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

export const isLoading: Story = {
    args: {
        isOpen: true,
        onClose: () => console.log('close window'),
    },
    decorators: StoreDecorator({
        user: {
            isLoading: true,
        }
    })
};
