import type { Meta, StoryObj } from '@storybook/react';

import { WatchListItem } from './WatchListItem';

const meta = {
    title: 'components/WatchListItem',
    component: WatchListItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof WatchListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

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
            '24hVolume': '39114805739'
        }
    },
};
