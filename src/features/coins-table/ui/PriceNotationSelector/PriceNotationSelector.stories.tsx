import type { Meta, StoryObj } from '@storybook/react';

import { PriceNotationSelector } from './PriceNotationSelector';

const meta = {
	title: 'Components/PriceNotationSelector',
	component: PriceNotationSelector,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof PriceNotationSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
