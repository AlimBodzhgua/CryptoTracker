import type { Meta, StoryObj } from '@storybook/react';

import { PageRequireAuth } from './PageRequireAuth';

const meta = {
	title: 'pages/PageRequireAuth',
	component: PageRequireAuth,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof PageRequireAuth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
