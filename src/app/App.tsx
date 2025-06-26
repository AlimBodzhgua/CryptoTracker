import { FC } from 'react';
import { AppRouter } from 'app/router/AppRouter';
import './styles/index.scss';
import { useInitUser } from 'features/user';
import { useCurrency } from 'features/currency';

export const App: FC = () => {
	useInitUser();
	useCurrency();

	return (
		<AppRouter />
	);
};
