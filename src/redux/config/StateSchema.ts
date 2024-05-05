import { CoinsStateSchema } from 'redux/slices/coinsSlice';
import { ConverterStateSchema } from 'redux/slices/converterSlice';
import { CurrencySchema } from 'redux/slices/currencySlice';
import { UserStateSchema } from 'redux/slices/userSlice';
import { ScrollRestorationStateSchema } from 'redux/slices/scrollRestorationSlice';


export interface StateSchema {
	coins: CoinsStateSchema,
	currency: CurrencySchema,
	user: UserStateSchema,
	converter: ConverterStateSchema,
	scrollRestoration: ScrollRestorationStateSchema,
}
