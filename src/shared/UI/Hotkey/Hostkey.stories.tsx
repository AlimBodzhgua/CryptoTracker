

import type { Meta, StoryObj } from '@storybook/react';

import { Hotkey } from './Hotkey';

const meta = {
	title: 'UI-Kit/Hotkey',
	component: Hotkey,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Hotkey>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: 'alt',
	},
};