import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { CoinsSearchBar } from './CoinsSearchBar';

const meta = {
	title: 'components/CoinsSearchBar',
	component: CoinsSearchBar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof CoinsSearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
	decorators: StoreDecorator({
		coins: {
			coins: [],
		},
	}),
};
