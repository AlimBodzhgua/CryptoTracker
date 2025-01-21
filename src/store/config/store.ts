import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from '../slices/userSlice';
import { converterReducer } from '../slices/converterSlice';
import { currencyReducer } from '../slices/currencySlice';
import { scrollRestorationReducer } from '../slices/scrollRestorationSlice';
import { coinsReducer } from '../slices/coinsSlice';
import { AppState } from './AppState';

export const createReduxStore = (initialState?: AppState) => {
	const rootReducer: ReducersMapObject<AppState> = {
		coins: coinsReducer,
		currency: currencyReducer,
		user: userReducer,
		converter: converterReducer,
		scrollRestoration: scrollRestorationReducer,
	};

	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
	});

	return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
