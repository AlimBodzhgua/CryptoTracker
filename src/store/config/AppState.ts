import { CoinsState } from 'store/slices/coinsSlice';
import { ConverterState } from 'store/slices/converterSlice';
import { CurrencyState } from 'store/slices/currencySlice';
import { UserState } from 'store/slices/userSlice';
import { ScrollRestorationState } from 'store/slices/scrollRestorationSlice';

export interface AppState {
	coins: CoinsState,
	currency: CurrencyState,
	user: UserState,
	converter: ConverterState,
	scrollRestoration: ScrollRestorationState,
}
