import { FC, ReactNode, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'components/UI/Layout/Layout';
import { RouteConfig } from './routeConfig';
import { RequireAuth } from './RequireAuth';

export const AppRouter: FC = () => {

    const renderRouteElement = useCallback((element: ReactNode) => {
        return (
            <Suspense fallback={<h1>Loading Page...</h1>}>
                {element}
            </Suspense>
        )
    }, [])


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
                            : renderRouteElement(route.element)
                        }
                    />
                ))}
            </Route>
        </Routes>
)};
