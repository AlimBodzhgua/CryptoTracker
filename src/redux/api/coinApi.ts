import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'coinranking2eb56d200a0d6048867e2e0f8fd62263c88205177c531252';

const options = {
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': API_KEY,
    },
};

export interface ICoin {
	id: string;
	name: string;
	symbol: string;
	icon: string;
	price: string;
}

export const coinApi = createApi({
    reducerPath: 'coinApi',
    // baseQuery: fetchBaseQuery({baseUrl: 'https://api.coinranking.com/v2'}),
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['Coin'],
    endpoints: (builder) => ({
        getCoins: builder.query<ICoin[], string>({
            query: (limit) => `coins?${limit && `limit=${limit}`}`,
        }),
        getCoinDetails: builder.query<ICoin, string>({
            query: (uuid) => `coin/${uuid}`,
        }),
        getUsers: builder.query({
            query: (limit = '') => ({
                url: '/users',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
});

export const { useGetUsersQuery } = coinApi;
