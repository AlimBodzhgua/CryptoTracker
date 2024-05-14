import { StateSchema } from '../config/StateSchema';

export const selectConverterCoinFrom = (state: StateSchema) => state.converter.converterData.coinFrom;

export const selectConverterCoinTo = (state: StateSchema) => state.converter.converterData.coinTo;

export const selectConverterCoins = (state: StateSchema) => state.converter.converterData.converterCoins;

export const selecetConverterResult = (state: StateSchema) => state.converter.converterData.convertResult;

export const selectConverterIsLoading = (state: StateSchema) => state.converter.isLoading;

export const selectConverterError = (state: StateSchema) => state.converter.error;
