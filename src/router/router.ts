export enum AppRoutes {
	MAIN = 'main',
	COINS = 'coins',
	WATCH_LIST = 'watchlist',
    PROFILE = 'profile',
    CONVERTER = 'converter',

	NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteCoins = () => '/coins';
export const getRouteWatchList = () => '/watchlist';
export const getRouteProfile = () => '/profile';
export const getRouteConverter = () => '/converter';
export const getRouteNotFound = () => '*';
