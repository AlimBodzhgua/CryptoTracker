import React from 'react';
import { Provider } from 'react-redux';
import { Decorator } from '@storybook/react';
import { AppState } from 'store/config/AppState';
import { createReduxStore } from '../../store/config/store';

export const StoreDecorator = (state: DeepPartial<AppState>): Decorator => {
	const store = createReduxStore(state as AppState);

	return (Story) => (
		<Provider store={store}>
			<Story />
		</Provider>
	);
};
