import type { Meta, StoryObj } from '@storybook/react';

import { sidebarList } from 'features/sidebar/model/sidebarList';
import { SidebarItem } from './SidebarItem';

const meta = {
	title: 'components/SidebarItem',
	component: SidebarItem,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof SidebarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		item: sidebarList[0],
	},
};

export const Collapsed: Story = {
	args: {
		item: sidebarList[0],
		collapsed: true,
	},
};
