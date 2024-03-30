import type { Meta, StoryObj } from '@storybook/react';

import { SidebarItem } from './SidebarItem';
import { sidebarList } from 'constants/sidebarList';

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
        item: sidebarList[0]
    },
};
