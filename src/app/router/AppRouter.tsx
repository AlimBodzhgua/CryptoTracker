import {
	FC, ReactNode, Suspense, useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'shared/UI/Layout/Layout';
import { LoaderRing } from 'shared/UI/LoaderRing/LoaderRing';
import { RouteConfig } from './routeConfig';
import { RequireAuth } from './RequireAuth';

export const AppRouter: FC = () => {
	const renderRouteElement = useCallback((element: ReactNode) => (
		<Suspense fallback={<LoaderRing className='spinner_wrapper' />}>
			{element}
		</Suspense>
	), []);

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				{Object.values(RouteConfig).map((route) => (
					<Route
						key={route.path}
						path={route.path}
						index={route.index}
						element={route.authRequire
							? <RequireAuth>{renderRouteElement(route.element)}</RequireAuth>
							: renderRouteElement(route.element)}
					/>
				))}
			</Route>
		</Routes>
	);
};
