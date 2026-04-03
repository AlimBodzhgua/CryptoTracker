import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DarkDecorator } from 'shared/config/storybook/DarkDecorator';
import LoginForm from './LoginForm';

const meta = {
	title: 'Components/LoginForm',
	component: LoginForm,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: DarkDecorator,
	argTypes: {},
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
