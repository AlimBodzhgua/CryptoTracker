import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { converterSlice } from 'features/coin-converter';
import { userSlice } from 'features/user';
import { currencySlice } from 'features/currency';
import { coinsSlice } from 'features/coins-table';
import { scrollRestorationSlice } from 'features/page';
import { globalStatsSlice } from 'features/global-stats';
import { AppState } from './AppState';
import { listenerMiddleware } from './listenerMiddleware';

export const createReduxStore = (initialState?: AppState) => {
	const rootReducer: ReducersMapObject<AppState> = {
		coins: coinsSlice.reducer,
		currency: currencySlice.reducer,
		user: userSlice.reducer,
		converter: converterSlice.reducer,
		scrollRestoration: scrollRestorationSlice.reducer,
		globalStats: globalStatsSlice.reducer,
	};

	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) => 
			getDefaultMiddleware().prepend(listenerMiddleware.middleware),
	});

	return store;
};
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
