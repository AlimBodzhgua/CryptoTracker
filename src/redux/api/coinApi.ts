import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICoin } from 'types/types';

const API_KEY = 'coinranking2eb56d200a0d6048867e2e0f8fd62263c88205177c531252';

const coinHeaders = {
    'Content-Type': 'application/json',
    'x-access-token': API_KEY,
};

interface CoinResponse {
    status: string;
    data: {
        stats: Record<string, string | number>,
        coins: ICoin[]
    }
}

export const coinApi = createApi({
    reducerPath: 'coinApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.coinranking.com/v2',
        headers: coinHeaders,
    }),
    tagTypes: ['Coin'],
    endpoints: (builder) => ({
        getCoins: builder.query<ICoin[], string>({
            query: (limit) => ({
                url: '/coins',
                params: {
                    limit,
                },
            }),
            transformResponse: (response: CoinResponse) => response.data.coins,
        }),
        getCoinDetails: builder.query<ICoin, string>({
            query: (uuid) => `coin/${uuid}`,
        }),
    }),
});

export const { useGetCoinsQuery } = coinApi;
