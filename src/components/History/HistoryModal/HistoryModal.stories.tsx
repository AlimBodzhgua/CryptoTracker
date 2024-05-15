import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'config/storybook/StoreDecorator';

import { HistoryModal } from './HistoryModal';

const meta = {
	title: 'components/HistoryModal',
	component: HistoryModal,
	parameters: {
		layout: 'centered',
		loki: { skip: true },
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof HistoryModal>;

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
	args: {
		isOpen: true,
		onClose: () => {},
	},
	decorators: StoreDecorator({
		user: {
			isLoading: false,
			error: undefined,
			authData: { conversionHistory },
		},
	}),
};

export const EmptyList: Story = {
	args: {
		isOpen: true,
		onClose: () => {},
	},
};

export const IsLoading: Story = {
	args: {
		isOpen: true,
		onClose: () => {},
	},
	decorators: StoreDecorator({
		user: {
			isLoading: true,
			error: undefined,
		},
	}),
};

export const WithError: Story = {
	args: {
		isOpen: true,
		onClose: () => {},
	},
	decorators: StoreDecorator({
		user: {
			isLoading: false,
			error: 'error message',
		},
	}),
};
