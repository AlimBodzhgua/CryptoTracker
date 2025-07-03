import { useEffect } from 'react';
import { useAppDispatch } from 'shared/hooks/redux';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants/localStorage';
import { userActions } from './userSlice';
import { initUserAuth } from './userActions';
import type { User } from './types';

export const useInitUser = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
		if (user) {
			const authData = JSON.parse(user) as User;
			dispatch(initUserAuth(authData.id));
		} else {
			dispatch(userActions.setMounted());
		}
	}, [dispatch]);
};
