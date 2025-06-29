import { createListenerMiddleware } from '@reduxjs/toolkit';
import { currencySlice, currencySelectors, fetchCurrency } from 'features/currency';
import { coinsSlice } from 'features/coins-table';
import { globalStatsSlice } from 'features/global-stats';
import type { Kurs } from 'shared/types/coin';
import type { AppState } from './AppState';
import type { AppDispatch } from './store';

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
	AppState,
	AppDispatch
>();

startAppListening({
	actionCreator: currencySlice.actions.setCurrentCurrency,
	effect: async (action, { getState, dispatch }) => {
		const prevCurrency = currencySelectors.selectPrevCurrency(getState());
		const { meta, payload } = await dispatch(fetchCurrency());
		
		if (meta.requestStatus === 'fulfilled') {
			const kurs = payload as Kurs; 

			dispatch(coinsSlice.actions.changeCurrency({
				kurs: kurs,
				prevCurrency: prevCurrency!,
				targetCurrency: action.payload,
			}))
			dispatch(globalStatsSlice.actions.changeCurrency({
				kurs: kurs,
				prevCurrency: prevCurrency!,
				targetCurrency: action.payload,
			}))
		}

	}
})