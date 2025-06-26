import { useAppSelector } from 'shared/hooks/redux';
import { FC, ReactNode, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectUser, selectUserMounted } from 'features/user/model/userSelectors';
import { PageRequireAuth } from 'shared/UI/PageRequireAuth/PageRequireAuth';
import { getRouteMain } from './router';

interface RequireAuthProps {
	children: ReactNode;
}

export const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
	const authData = useAppSelector(selectUser);
	const mounted = useAppSelector(selectUserMounted);
	const navigate = useNavigate();
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (!authData && mounted) {
			timer.current = setTimeout(() => {
				navigate(getRouteMain());
			}, 3500);
		}

		return () => {
			if (timer.current) clearTimeout(timer.current);
		};
	}, [authData, mounted]);

	if (!authData && mounted) {
		return <PageRequireAuth />;
	}

	return children;
};
