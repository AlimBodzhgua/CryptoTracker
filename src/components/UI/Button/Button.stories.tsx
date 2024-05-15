import type { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonSize, ButtonTheme } from './Button';

const meta = {
	title: 'UI-Kit/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: 'button',
		theme: ButtonTheme.primary,
	},
};

export const Secondary: Story = {
	args: {
		children: 'button',
		theme: ButtonTheme.secondary,
	},
};

export const Clear: Story = {
	args: {
		children: 'button',
		theme: ButtonTheme.clear,
	},
};

export const SizeBig: Story = {
	args: {
		children: 'button',
		theme: ButtonTheme.primary,
		size: ButtonSize.big,
	},
};

export const SizeMeduim: Story = {
	args: {
		children: 'button',
		theme: ButtonTheme.primary,
		size: ButtonSize.medium,
	},
};

export const SizeSmall: Story = {
	args: {
		children: 'button',
		theme: ButtonTheme.primary,
		size: ButtonSize.small,
	},
};
