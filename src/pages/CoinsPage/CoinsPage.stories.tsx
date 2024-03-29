import type { Meta, StoryObj } from '@storybook/react';

import CoinsPage from './CoinsPage';

const meta = {
    title: 'pages/CoinsPage',
    component: CoinsPage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof CoinsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};