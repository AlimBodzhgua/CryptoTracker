import { RouteProps } from 'react-router-dom';

export type AppRouteProps = RouteProps & {
	authRequire?: boolean;
};
