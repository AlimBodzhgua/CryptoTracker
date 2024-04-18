import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'config/storybook/StoreDecorator';

import { RegisterModal } from './RegisterModal';

const meta = {
    title: 'components/RegisterModal',
    component: RegisterModal,
    parameters: {
        layout: 'centered',
        loki: { skip: true },
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof RegisterModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        isOpen: true,
        onClose: () => {},
    },
};

export const IsLoading: Story = {
    args: {
        isOpen: true,
        onClose: () => {},
    },
    decorators: StoreDecorator({
        user: {
            isLoading: true,
        },
    }),
};
