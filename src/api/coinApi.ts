import axios from 'axios';

const coinApiHeaders = {
    'Content-Type': 'application/json',
    'x-access-token': process.env.API_KEY,
};

const coinApi = axios.create({
	baseURL: 'https://api.coinranking.com/v2',
	headers: coinApiHeaders, 
}) 

export default coinApi;