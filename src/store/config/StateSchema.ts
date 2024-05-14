import { CoinsStateSchema } from 'store/slices/coinsSlice';
import { ConverterStateSchema } from 'store/slices/converterSlice';
import { CurrencySchema } from 'store/slices/currencySlice';
import { UserStateSchema } from 'store/slices/userSlice';
import { ScrollRestorationStateSchema } from 'store/slices/scrollRestorationSlice';


export interface StateSchema {
	coins: CoinsStateSchema,
	currency: CurrencySchema,
	user: UserStateSchema,
	converter: ConverterStateSchema,
	scrollRestoration: ScrollRestorationStateSchema,
}
