import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { currencyReducer } from 'redux/slices/currencySlice';
import { StateSchema } from './StateSchema';
import { coinsReducer } from '../slices/coinsSlice';

export const createReduxStore = (initialState?: StateSchema) => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        coins: coinsReducer,
        currency: currencyReducer,
    };

    const store = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
    });

    return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
