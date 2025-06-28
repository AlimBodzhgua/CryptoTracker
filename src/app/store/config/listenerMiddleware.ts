import { createListenerMiddleware } from '@reduxjs/toolkit';
import { currencySlice } from 'features/currency';
import { coinsSlice } from 'features/coins-table';
import { currencySelectors } from 'features/currency';
import { globalStatsSlice } from 'features/global-stats';
import type { AppState } from './AppState';
import type { AppDispatch } from './store';

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
	AppState,
	AppDispatch
>();

startAppListening({
	actionCreator: currencySlice.actions.setCurrentCurrency,
	effect: (action, { getState, dispatch }) => {
		const kurs = currencySelectors.selectCurrencyKurs(getState());
		const prevCurrency = currencySelectors.selectPrevCurrency(getState());

		dispatch(coinsSlice.actions.changeCurrency({
			kurs: kurs!,
			prevCurrency: prevCurrency!,
			targetCurrency: action.payload,
		}))
		dispatch(globalStatsSlice.actions.changeCurrency({
			kurs: kurs!,
			prevCurrency: prevCurrency!,
			targetCurrency: action.payload,
		}))
	}
})