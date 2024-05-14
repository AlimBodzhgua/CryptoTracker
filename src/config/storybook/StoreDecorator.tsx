import React from 'react';
import { Provider } from 'react-redux';
import { Decorator } from '@storybook/react';
import { StateSchema } from 'store/config/StateSchema';
import { createReduxStore } from '../../store/config/store';

export const StoreDecorator = (state: DeepPartial<StateSchema>): Decorator => {
    const store = createReduxStore(state as StateSchema);

    return (Story) => (
        <Provider store={store}>
            <Story />
        </Provider>
    );
};
