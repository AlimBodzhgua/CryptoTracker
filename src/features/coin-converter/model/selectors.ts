import { AppState } from 'app/store/config/AppState';

export const selectConverterCoinFrom = (state: AppState) => state.converter.converterData.coinFrom;
export const selectConverterCoinTo = (state: AppState) => state.converter.converterData.coinTo;
export const selectConverterCoins = (state: AppState) => state.converter.converterData.converterCoins;
export const selecetConverterResult = (state: AppState) => state.converter.converterData.convertResult;
export const selectConverterIsLoading = (state: AppState) => state.converter.isLoading;
export const selectConverterError = (state: AppState) => state.converter.error;
