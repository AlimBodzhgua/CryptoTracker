import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

import HistoryList from './HistoryList';

const meta = {
	title: 'components/HistoryList',
	component: HistoryList,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof HistoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

const conversionHistory = [
	{
		amount: 1,
		coinFrom: {
			iconUrl: 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg',
			name: 'Bitcoin',
			symbol: 'BTC',
		},
		coinTo: {
			iconUrl: 'https://cdn.coinranking.com/mgHqwlCLj/usdt.svg',
			name: 'Usd tether',
			symbol: 'USDT',
		},
		convertResult: 65789.5,
	},
	{
		amount: 12,
		coinFrom: {
			iconUrl: 'https://cdn.coinranking.com/rk4RKHOuW/eth.svg',
			name: 'Ethereum',
			symbol: 'ETH',
		},
		coinTo: {
			iconUrl: 'https://cdn.coinranking.com/jkDf8sQbY/usdc.svg',
			name: 'Usc',
			symbol: 'USC',
		},
		convertResult: 39828,
	},
];

export const Primary: Story = {
	args: {},
	decorators: StoreDecorator({
		user: {
			isLoading: false,
			error: undefined,
			authData: { conversionHistory },
		},
	}),
};

export const EmptyList: Story = {
	args: {},
};

export const IsLoading: Story = {
	args: {},
	decorators: StoreDecorator({
		user: {
			isLoading: true,
			error: undefined,
		},
	}),
};

export const WithError: Story = {
	args: {},
	decorators: StoreDecorator({
		user: {
			isLoading: false,
			error: 'error message',
		},
	}),
};
