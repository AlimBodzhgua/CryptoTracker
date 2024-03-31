import type { Meta, StoryObj } from '@storybook/react';

import { LoaderRing } from './LoaderRing';

const meta = {
    title: 'UI-Kit/LoaderRing',
    component: LoaderRing,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof LoaderRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};