import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ContainerDecorator } from 'shared/config/storybook/ContainerDecorator';

import { GlobalStats } from './GlobalStats';
import { DarkDecorator } from 'shared/config/storybook/DarkDecorator';

const meta = {
	title: 'components/GlobalStats',
	component: GlobalStats,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	decorators: [ContainerDecorator, DarkDecorator],
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
	args: {
		currentCurrency: 'USD',
	},
	decorators: StoreDecorator({
		globalStats: {
			data: {
				btcDominance: 52.00039165980507,
				totalCoins: 36973,
				totalExchanges: 178,
				totalMarkets: 43386,
				total24hVolume: '61664704435',
				totalMarketCap: '2623653892264',
				bestCoins: coinList,
				newestCoins: coinList,
			},
			error: undefined,
		},
	}),
};

export const WithError: Story = {
	args: {
		currentCurrency: 'USD',
	},
	decorators: StoreDecorator({
		globalStats: {
			isLoading: false,
			error: 'Error',
		},
	}),
};

export const IsLoading: Story = {
	args: {
		currentCurrency: 'USD',
	},
	decorators: StoreDecorator({
		globalStats: {
			isLoading: true,
		},
	}),
};
