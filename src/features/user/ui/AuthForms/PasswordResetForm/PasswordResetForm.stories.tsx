import type { Meta, StoryObj } from '@storybook/react';
import { DarkDecorator } from 'shared/config/storybook/DarkDecorator';
import PasswordResetForm from './PasswordResetForm';

const meta = {
	title: 'Components/PasswordResetForm',
	component: PasswordResetForm,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: DarkDecorator,
	argTypes: {},
} satisfies Meta<typeof PasswordResetForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
