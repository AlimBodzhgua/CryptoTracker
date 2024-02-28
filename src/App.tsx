import { FC, useEffect } from 'react';
import { useGetUsersQuery } from 'redux/api/coinApi';
import { AppRouter } from 'router/AppRouter';
import 'styles/index.scss';

export const App: FC = () => {
    const { data: users } = useGetUsersQuery('5');

    useEffect(() => {
        console.log(users);
    }, []);

    return (
        <AppRouter />
    );
};
