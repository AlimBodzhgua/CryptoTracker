import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DarkDecorator } from 'shared/config/storybook/DarkDecorator';
import RegisterForm from './RegisterForm';

const meta = {
	title: 'Components/RegisterForm',
	component: RegisterForm,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	decorators: DarkDecorator,
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
