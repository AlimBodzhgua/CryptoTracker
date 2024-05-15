import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta = {
	title: 'UI-Kit/Input',
	component: Input,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const WithAddonBefore: Story = {
	args: {
		addonBefore: <div>before</div>,
	},
};

export const WithAddonAfter: Story = {
	args: {
		addonAfter: <div>after</div>,
	},
};
