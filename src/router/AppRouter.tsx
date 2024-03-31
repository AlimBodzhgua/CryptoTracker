import {
    FC, ReactNode, Suspense, useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'components/UI/Layout/Layout';
import { RouteConfig } from './routeConfig';
import { RequireAuth } from './RequireAuth';
import { LoaderRing } from 'components/UI/LoaderRing/LoaderRing';

export const AppRouter: FC = () => {
    const renderRouteElement = useCallback((element: ReactNode) => (
        <Suspense fallback={<LoaderRing className='spinner_wrapper'/>}>
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
