import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { AppState } from 'app/store/config/AppState';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import { createReduxStore } from 'app/store/config/store';

export interface renderWithRouterOptions {
	route?: string;
    initialState?: DeepPartial<AppState>;
}

export function componentRender(
	component: ReactNode,
	options: renderWithRouterOptions = {},
) {
	const {
		route = '/',
		initialState,
	} = options;
	const store = createReduxStore(initialState as AppState);

	return render(
		<MemoryRouter initialEntries={[route]}>
			<Provider store={store}>
				<I18nextProvider i18n={i18nForTests}>
					{component}
				</I18nextProvider>
			</Provider>
		</MemoryRouter>,
	);
}
