import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema } from 'store/config/StateSchema';;
import { createReduxStore } from '../../store/config/store';
import i18nForTests from 'config/i18n/i18nForTests';

export interface renderWithRouterOptions {
	route?: string;
    initialState?: DeepPartial<StateSchema>;
}

export function componentRender(
    component: ReactNode,
    options: renderWithRouterOptions = {},
) {
    const {
        route = '/',
        initialState,
    } = options;
    const store = createReduxStore(initialState as StateSchema);

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