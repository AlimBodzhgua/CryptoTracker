import type { Meta, StoryObj } from '@storybook/react';

import { PageError } from './PageError';

const meta = {
	title: 'Components/PageError',
	component: PageError,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof PageError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
