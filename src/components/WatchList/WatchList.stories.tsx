import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'config/storybook/StoreDecorator';
import { WatchList } from './WatchList';

const meta = {
    title: 'components/WatchList',
    component: WatchList,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof WatchList>;

export default meta;
type Story = StoryObj<typeof meta>;

const coinsList = [
    {
        uuid: 'Qwsogvtv82FCd',
        symbol: 'BTC',
        name: 'Bitcoin',
        iconUrl: 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg',
        rank: 1,
        price: '67280.52',
        change: '-2.23',
        marketCap: '1324185382970',
        '24hVolume': '39114805739',
    },
    {
        uuid: 'Qwsogvtv82FCd',
        symbol: 'ETH',
        name: 'Etherum',
        iconUrl: 'https://cdn.coinranking.com/rk4RKHOuW/eth.svg',
        rank: 2,
        price: '3248.5472',
        change: '-1.23',
        marketCap: '396529271041',
        '24hVolume': '23482853164',
    },
];

export const Primary: Story = {
    args: {},
};

export const Empty: Story = {
    args: {},
};

export const IsLoading: Story = {
    args: {},
    decorators: StoreDecorator({
    	user: {
    		isLoading: true,
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
