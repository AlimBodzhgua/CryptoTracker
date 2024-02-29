import { FC, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'components/UI/Layout/Layout';
import { RouteConfig } from './routeConfig';

export const AppRouter: FC = () => (
    <Routes>
        <Route path='/' element={<Layout />}>
            {Object.values(RouteConfig).map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    index={route.index}
                    element={(
                        <Suspense fallback={<h1>Loading Page...</h1>}>
                            {route.element}
                        </Suspense>
                    )}
                />
            ))}
        </Route>
    </Routes>
);
