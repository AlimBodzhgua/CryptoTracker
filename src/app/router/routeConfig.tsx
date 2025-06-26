import { AppRouteProps } from 'shared/types/router';
import { CoinsPage } from 'pages/CoinsPage/CoinsPage.async';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage.async';
import { WatchListPage } from 'pages/WatchListPage/WatchListPage.async';
import { MainPage } from 'pages/MainPage/MainPage.async';
import { ConverterPage } from 'pages/ConverterPage/ConverterPage.async';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';

import {
	AppRoutes,
	getRouteCoins,
	getRouteConverter,
	getRouteMain,
	getRouteNotFound,
	getRouteProfile,
	getRouteWatchList,
} from 'shared/constants/routes';

export const RouteConfig: Record<AppRoutes, AppRouteProps> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <MainPage />,
	},
	[AppRoutes.COINS]: {
		path: getRouteCoins(),
		element: <CoinsPage />,
	},
	[AppRoutes.WATCH_LIST]: {
		path: getRouteWatchList(),
		element: <WatchListPage />,
		authRequire: true,
	},
	[AppRoutes.PROFILE]: {
		path: getRouteProfile(),
		element: <ProfilePage />,
		authRequire: true,
	},
	[AppRoutes.CONVERTER]: {
		path: getRouteConverter(),
		element: <ConverterPage />,
	},
	[AppRoutes.NOT_FOUND]: {
		path: getRouteNotFound(),
		element: <NotFoundPage />,
	},
};
