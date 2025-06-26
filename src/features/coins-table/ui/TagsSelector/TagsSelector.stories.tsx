import type { Meta, StoryObj } from '@storybook/react';

import { TagsSelector } from './TagsSelector';

const meta = {
	title: 'Components/TagsSelector',
	component: TagsSelector,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof TagsSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
