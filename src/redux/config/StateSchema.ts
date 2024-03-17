import { CoinsStateSchema } from 'redux/slices/coinsSlice';
import { CurrencySchema } from 'redux/slices/currencySlice';
import { UserStateSchema } from 'redux/slices/userSlice';

export interface StateSchema {
	coins: CoinsStateSchema,
	currency: CurrencySchema,
	user: UserStateSchema,
}
