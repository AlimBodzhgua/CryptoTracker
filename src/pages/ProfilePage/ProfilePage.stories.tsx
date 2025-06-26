import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import ProfilePage from './ProfilePage';

const meta = {
	title: 'pages/ProfilePage',
	component: ProfilePage,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof ProfilePage>;

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
