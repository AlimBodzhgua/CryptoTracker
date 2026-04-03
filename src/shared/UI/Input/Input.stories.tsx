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
	args: {
		placeholder: 'Enter data...'
	},
};

export const WithAddonBefore: Story = {
	args: {
		placeholder: 'Enter data...',
		addonBefore: <div>before</div>,
	},
};

export const WithAddonAfter: Story = {
	args: {
		placeholder: 'Enter data...',
		addonAfter: <div>after</div>,
	},
};
