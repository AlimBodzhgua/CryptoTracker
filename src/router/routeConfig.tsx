import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

const MainPage = lazy(() => import('pages/MainPage/MainPage'));
const WatchListPage = lazy(() => import('pages/WatchListPage/WatchListPage'));
const CoinsPage = lazy(() => import('pages/CoinsPage/CoinsPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage/ProfilePage'));
const ConverterPage = lazy(() => import('pages/ConverterPage/ConverterPage'));

export type AppRouteProps = RouteProps & {
	authRequire?: boolean;
}

export enum AppRoutes {
	MAIN = 'main',
	COINS = 'coins',
	WATCH_LIST = 'watchlist',
    PROFILE = 'profile',
    CONVERTER = 'converter',

	NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.COINS]: '/coins',
	[AppRoutes.WATCH_LIST]: '/watchlist',
	[AppRoutes.PROFILE]: '/profile',
	[AppRoutes.CONVERTER]: '/converter',

	[AppRoutes.NOT_FOUND]: '*',
};

export const RouteConfig: Record<AppRoutes, AppRouteProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
	[AppRoutes.COINS]: {
		path: RoutePath.coins,
		element: <CoinsPage />,
	},
	[AppRoutes.WATCH_LIST]: {
		path: RoutePath.watchlist,
		element: <WatchListPage />,
		authRequire: true,
	},
	[AppRoutes.PROFILE]: {
		path: RoutePath.profile,
		element: <ProfilePage />,
		authRequire: true,
	},
	[AppRoutes.CONVERTER]: {
		path: RoutePath.converter,
		element: <ConverterPage />,
	},
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
