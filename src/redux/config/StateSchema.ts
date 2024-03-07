import { CoinsStateSchema } from 'redux/slices/coinsSlice';
import { CurrencySchema } from 'redux/slices/currencySlice';

export interface StateSchema {
	coins: CoinsStateSchema,
	currency: CurrencySchema,
}
