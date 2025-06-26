import type { Meta, StoryObj } from '@storybook/react';

import { Sidebar } from './Sidebar';

const meta = {
	title: 'components/Sidebar',
	component: Sidebar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
