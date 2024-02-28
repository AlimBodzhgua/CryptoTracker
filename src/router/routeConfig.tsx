import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

const MainPage = lazy(() => import('pages/MainPage/MainPage'));
const NewsPage = lazy(() => import('pages/NewsPage/NewsPage'));
const CoinsPage = lazy(() => import('pages/CoinsPage/CoinsPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

export type AppRouteProps = RouteProps & {
	authRequire?: boolean;
}

export enum AppRoutes {
	MAIN = 'main',
	COINS = 'coins',
	NEWS = 'news',

	NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.COINS]: '/coins',
    [AppRoutes.NEWS]: '/news',

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
    [AppRoutes.NEWS]: {
        path: RoutePath.news,
        element: <NewsPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
