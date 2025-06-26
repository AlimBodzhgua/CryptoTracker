import { useEffect } from 'react';
import { useAppDispatch } from 'shared/hooks/redux';
import { userActions } from './userSlice';
import { initUserAuth } from './userActions';
import { USER_LOCALSTORAGE_KEY } from 'shared/constants/localStorage';
import type { User } from './types';

export const useInitUser  = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		//dispatch(fetchCurrency());
		const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
		if (user) {
			const authData = JSON.parse(user) as User;
			dispatch(initUserAuth(authData.id));
		} else {
			dispatch(userActions.setMounted());
		}
	}, [dispatch]);
}