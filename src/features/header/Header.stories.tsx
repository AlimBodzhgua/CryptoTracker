import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

import { Header } from './Header';

const meta = {
	title: 'components/Header',
	component: Header,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Header>;

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
