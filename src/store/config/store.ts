import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from '../slices/userSlice';
import { converterReducer } from '../slices/converterSlice';
import { currencyReducer } from '../slices/currencySlice';
import { scrollRestorationReducer } from '../slices/scrollRestorationSlice';
import { coinsReducer } from '../slices/coinsSlice';
import { StateSchema } from './StateSchema';

export const createReduxStore = (initialState?: StateSchema) => {
    const rootReducer: ReducersMapObject<StateSchema> = {
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
