import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'config/storybook/StoreDecorator';
import { CoinTable } from './CoinTable';
import classes from './CoinTable.module.scss';

const meta = {
    title: 'components/CoinTable',
    component: CoinTable,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof CoinTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const sparkline = [
    '63392.09056861508', '62638.730198969024', '62674.13144522922',
    '63057.23269206609', '62850.049028576526', '62576.4057499635',
    '62106.87969623308', '61983.555811711885', '62796.466359770195',
    '62755.62862943175', '62906.753316458206', '62833.17111704885',
];

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
        sparkline,
    },
    {
        uuid: 'razxDUgYGNAdQ',
        symbol: 'ETH',
        name: 'Etherum',
        iconUrl: 'https://cdn.coinranking.com/rk4RKHOuW/eth.svg',
        rank: 2,
        price: '3248.5472',
        change: '-1.23',
        marketCap: '396529271041',
        '24hVolume': '23482853164',
        sparkline,
    },
];

export const Primary: Story = {
    args: {
        className: classes.fullWidth,
    },
    decorators: StoreDecorator({
        coins: {
            isLoading: false,
            page: 0,
            searchedFilteredCoins: coinsList,
            coins: coinsList,
        },
    }),
};

export const WithError: Story = {
    args: {},
    decorators: StoreDecorator({
        coins: {
            isLoading: false,
            error: 'error',
        },
    }),
};

export const IsLoading: Story = {
    args: {},
    decorators: StoreDecorator({
        coins: {
            isLoading: true,
            page: 0,
            coins: [],
            searchedFilteredCoins: [],
        },
    }),
};

export const FetchNextData: Story = {
    args: {},
    decorators: StoreDecorator({
        coins: {
            isLoading: true,
            page: 1,
            coins: coinsList,
            searchedFilteredCoins: coinsList,
        },
    }),
};

export const WithCoinInWatchList: Story = {
    args: {
        className: classes.fullWidth,
    },
    decorators: StoreDecorator({
        coins: {
            isLoading: false,
            page: 0,
            searchedFilteredCoins: coinsList,
            coins: coinsList,
        },
        user: {
            _mounted: true,
            authData: {
                watchList: {
                    ids: ['Qwsogvtv82FCd'],
                },
            },
        },
    }),
};
