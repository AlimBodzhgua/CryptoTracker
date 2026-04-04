import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { CoinsList } from './CoinsList';
import classes from './CoinsList.module.scss'

const meta = {
	title: 'components/ConverterCoinsList',
	component: CoinsList,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof CoinsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const coinList = [
	{
		name: 'Bitcoin',
		symbol: 'BTC',
		iconUrl: 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg',
	},
	{
		name: 'Ethereum',
		symbol: 'ETH',
		iconUrl: 'https://cdn.coinranking.com/rk4RKHOuW/eth.svg',
	},
	{
		name: 'USDT',
		symbol: 'USDT',
		iconUrl: 'https://cdn.coinranking.com/fonfHmzJr/prime.png',
	},
];

export const Primary: Story = {
	decorators: StoreDecorator({
		converter: {
			converterData: {
				converterCoins: coinList,
				coinFrom: coinList[0],
				coinTo: coinList[2],
				convertResult: 12,
			},
			isLoading: false,
			error: undefined,
		},
	}),
	render: () => <CoinsList className={classes.isShow}/>,
};