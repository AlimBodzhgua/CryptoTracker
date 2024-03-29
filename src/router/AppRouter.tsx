import {
    FC, ReactNode, Suspense, useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'components/UI/Layout/Layout';
import { RouteConfig } from './routeConfig';
import { RequireAuth } from './RequireAuth';
import { ColorRing } from 'react-loader-spinner';

export const AppRouter: FC = () => {
    const renderRouteElement = useCallback((element: ReactNode) => (
        <Suspense fallback={
            <div className='spinner_wrapper'>
                <ColorRing
                    visible={true}
                    height="85"
                    width="85"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e6e6e6', '#cccccc', '#b3b3b3', '#bfbfbf', '#e6e6e6']}
                />
            </div>
        }>
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
