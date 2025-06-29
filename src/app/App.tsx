import { FC } from 'react';
import { AppRouter } from 'app/router/AppRouter';
import { useInitUser } from 'features/user';
import './styles/index.scss';

export const App: FC = () => {
	useInitUser();

	return (
		<AppRouter />
	);
};
