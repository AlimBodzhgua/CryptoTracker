import type { Meta, StoryObj } from '@storybook/react';

import { HistoryItem } from './HistoryItem';

const meta = {
	title: 'components/HistoryItem',
	component: HistoryItem,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof HistoryItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const item = {
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
};

export const Primary: Story = {
	args: { item },
};
