export const SortField = {
	rank: 'rank',
	name: 'name',
	price: 'price',
	change: 'change',
	'24hVolume': '24hVolume',
	marketCap: 'marketCap',
} as const;

export const SortDirection = {
	asc: 'asc',
	desc: 'desc',
} as const;


export const TagList = {
	'All Coins': 'All Coins',
	defi: 'defi',
	stablecoin: 'stablecoin',
	exchange: 'exchange',
	staking: 'staking',
	web3: 'web3',
	nft: 'nft',
	dex: 'dex',
	meme: 'meme',
	wrapped: 'wrapped',
} as const;