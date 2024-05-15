import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { App } from './App';
import { createReduxStore } from './store/config/store';
import 'config/i18n/i18n';

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
