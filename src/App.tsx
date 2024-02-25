import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/index.scss';

const API_KEY = 'coinranking2eb56d200a0d6048867e2e0f8fd62263c88205177c531252';
const url = `https://api.coinranking.com/v2/coins?limit=10`;
const options = {
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': API_KEY,
  },
};


export const App = () => {

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(url, options);
                console.log(response.data);
                return response;
            } catch(error) {
                throw new Error('Error getting coins', error);
            }
        }
        //fetchData()
    }, [])

    return (
        <div className='app'>
            <h1>Welcome</h1>
        </div>
    );
};
