import React from 'react';
import { Provider } from 'react-redux';
import { Decorator } from '@storybook/react';
import { StateSchema } from 'redux/config/StateSchema';
import { createReduxStore } from '../../redux/config/store';

export const StoreDecorator = (state: StateSchema): Decorator => {
    const store = createReduxStore(state as StateSchema);

    return (Story) => (
        <Provider store={store}>
            <Story />
        </Provider>
    );
};
