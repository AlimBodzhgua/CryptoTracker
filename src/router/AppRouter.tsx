import { FC, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteConfig } from './routeConfig';

export const AppRouter: FC = () => (
    <Routes>
        {Object.values(RouteConfig).map((route) => (
            <Route
                key={route.path}
                path={route.path}
                element={(
                    <Suspense fallback={<h1>Loading Page...</h1>}>
                        {route.element}
                    </Suspense>
                )}
            />
        ))}
    </Routes>
);
