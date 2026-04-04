import type { Meta, StoryObj } from '@storybook/react';

import { DarkDecorator } from 'shared/config/storybook/DarkDecorator';
import { Button } from './Button';

const meta = {
	title: 'UI-Kit/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
	decorators: DarkDecorator,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: 'button',
		theme: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		children: 'button',
		theme: 'secondary',
	},
};

export const White: Story = {
	args: {
		children: 'button',
		theme: 'white',
	},
};

export const Red: Story = {
	args: {
		children: 'button',
		theme: 'red',
	},
};

export const Clear: Story = {
	args: {
		children: 'button',
		theme: 'clear',
	},
};

export const SizeBig: Story = {
	args: {
		children: 'button',
		theme: 'primary',
		size: 'lg',
	},
};

export const SizeMedium: Story = {
	args: {
		children: 'button',
		theme: 'primary',
		size: 'md',
	},
};

export const SizeSmall: Story = {
	args: {
		children: 'button',
		theme: 'primary',
		size: 'sm',
	},
};
