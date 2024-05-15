import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'config/storybook/StoreDecorator';

import { GlobalStats } from './GlobalStats';

const meta = {
	title: 'components/GlobalStats',
	component: GlobalStats,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof GlobalStats>;

export default meta;
type Story = StoryObj<typeof meta>;

const coinList = [
	{
		name: 'Echelon Prime',
		symbol: 'Prime',
		iconUrl: 'https://cdn.coinranking.com/fonfHmzJr/prime.png',
	},
	{
		name: 'Echelon Prime',
		symbol: 'Prime',
		iconUrl: 'https://cdn.coinranking.com/fonfHmzJr/prime.png',
	},
	{
		name: 'Echelon Prime',
		symbol: 'Prime',
		iconUrl: 'https://cdn.coinranking.com/fonfHmzJr/prime.png',
	},
];

export const Primary: Story = {
	args: {},
	decorators: StoreDecorator({
		coins: {
			globalStats: {
				btcDominance: 52.00039165980507,
				totalCoins: 36973,
				totalExchanges: 178,
				totalMarkets: 43386,
				total24hVolume: '61664704435',
				totalMarketCap: '2623653892264',
				bestCoins: coinList,
				newestCoins: coinList,
			},
		},
	}),
};

export const WithError: Story = {
	args: {},
	decorators: StoreDecorator({
		coins: {
			isLoading: false,
			error: 'Error message',
		},
	}),
};

export const IsLoading: Story = {
	args: {},
	decorators: StoreDecorator({
		coins: {
			isLoading: true,
		},
	}),
};
