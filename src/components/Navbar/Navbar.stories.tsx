import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'config/storybook/StoreDecorator';

import { Navbar } from './Navbar';

const meta = {
    title: 'components/Navbar',
    component: Navbar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const userLoggedIn: Story = {
    args: {},
    decorators: StoreDecorator({
        user: {
            authData: {
                email: 'user@mail.ru',
                login: 'user',
                isEmailVerified: true,
            },
        },
    }),
};

export const userNotLoggedIn: Story = {
    args: {},
    decorators: StoreDecorator({
        user: {
            authData: undefined,
        },
    }),
};
