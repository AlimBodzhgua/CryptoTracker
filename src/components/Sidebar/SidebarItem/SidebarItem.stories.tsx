import type { Meta, StoryObj } from '@storybook/react';

import { sidebarList } from 'constants/sidebarList';
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
