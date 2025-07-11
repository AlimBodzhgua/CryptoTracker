import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

import MainPage from './MainPage';

const meta = {
	title: 'pages/MainPage',
	component: MainPage,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof MainPage>;

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
		},
	}),
};

export const WithError: Story = {
	args: {},
	decorators: StoreDecorator({
		globalStats: {
			isLoading: false,
			error: 'Error message',
		},
	}),
};

export const IsLoading: Story = {
	args: {},
	decorators: StoreDecorator({
		globalStats: {
			isLoading: true,
		},
	}),
};
