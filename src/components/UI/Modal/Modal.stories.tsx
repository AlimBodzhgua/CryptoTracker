import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './Modal';

const meta = {
    title: 'UI-Kit/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        isOpen: true,
        onClose: () => console.log('close window'),
        children: <div>Modal window</div>,
    },
};
