import React from 'react';
import { Provider } from 'react-redux';
import { Decorator } from '@storybook/react';
import { createReduxStore } from '../../redux/config/store';
import { StateSchema } from 'redux/config/StateSchema';

export const StoreDecorator = (state: StateSchema): Decorator => {
    const store = createReduxStore(state as StateSchema);

    return (Story) => {
        return (
            <Provider store={store}>
                <Story />
            </Provider>
        )
    }
}