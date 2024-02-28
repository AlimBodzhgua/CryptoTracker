import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { countReducer } from '../reducers/countReducer';
import { coinApi } from '../api/coinApi';

export const createReduxStore = (initialState?: StateSchema) => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        count: countReducer,
        [coinApi.reducerPath]: coinApi.reducer,
    };

    const store = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(coinApi.middleware),

    });

    return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
