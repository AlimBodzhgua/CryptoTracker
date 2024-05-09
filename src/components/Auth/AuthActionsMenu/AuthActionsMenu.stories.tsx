import type { Meta, StoryObj } from '@storybook/react';
import { AuthActionsMenu } from './AuthActionsMenu';
import { StoreDecorator } from 'config/storybook/StoreDecorator';


const meta = {
    title: 'Components/AuthActionsMenu',
    component: AuthActionsMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof AuthActionsMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserLoggedIn: Story = {
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

export const UserNotLoggedIn: Story = {
    args: {},
    decorators: StoreDecorator({
        user: {
            authData: undefined,
        },
    }),
};
