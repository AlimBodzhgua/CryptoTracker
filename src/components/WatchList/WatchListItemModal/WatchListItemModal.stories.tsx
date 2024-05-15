import type { Meta, StoryObj } from '@storybook/react';

import { WatchListItemModal } from './WatchListItemModal';

const meta = {
	title: 'components/WatchListItemModal',
	component: WatchListItemModal,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof WatchListItemModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const sparkline = [
	'63392.09056861508', '62638.730198969024', '62674.13144522922',
	'63057.23269206609', '62850.049028576526', '62576.4057499635',
	'62106.87969623308', '61983.555811711885', '62796.466359770195',
	'62755.62862943175', '62906.753316458206', '62833.17111704885',
];

export const Primary: Story = {
	args: {
		coin: {
			uuid: 'Qwsogvtv82FCd',
			symbol: 'BTC',
			name: 'Bitcoin',
			iconUrl: 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg',
			rank: 1,
			price: '67280.52',
			change: '-2.23',
			marketCap: '1324185382970',
			'24hVolume': '39114805739',
			sparkline,
		},
		isOpen: true,
		onClose: () => {},
	},
};
