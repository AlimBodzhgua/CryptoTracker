import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'config/storybook/StoreDecorator';
import { ProfileCard } from './ProfileCard';

const meta = {
    title: 'components/ProfileCard',
    component: ProfileCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const authData = {
    id: '12345',
    login: 'userLogin',
    email: 'user@mail.ru',
    imageUrl: 'https://www.w3schools.com/howto/img_avatar.png',
    isEmailVerified: false,
};

export const Primary: Story = {
    args: {},
    decorators: StoreDecorator({
        user: {
            authData,
        },
    }),
};

export const EmailVerified: Story = {
    args: {},
    decorators: StoreDecorator({
        user: {
            authData: { ...authData, isEmailVerified: true },
        },
    }),
};
export const IsLoading: Story = {
    args: {},
    decorators: StoreDecorator({
        user: {
            authData,
            isLoading: true,
        },
    }),
};
