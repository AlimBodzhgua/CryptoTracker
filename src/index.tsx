import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from 'app/ErrorBoundary/ErrorBoundary';
import { App } from './app/App';
import { createReduxStore } from './app/store/config/store';
import 'shared/config/i18n/i18n';

const root = createRoot(document.getElementById('root')!);

const store = createReduxStore();

root.render(
	<ErrorBoundary>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</ErrorBoundary>,
);
