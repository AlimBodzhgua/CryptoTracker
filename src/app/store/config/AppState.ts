import { ConverterState } from 'features/coin-conveter';
import { CoinsState } from 'features/coins-table';
import { CurrencyState } from 'features/currency';
import { UserState } from 'features/user';
import { ScrollRestorationState } from 'features/page';
import { GlobalStatsState } from 'features/GlobalStats';

export interface AppState {
	coins: CoinsState,
	currency: CurrencyState,
	user: UserState,
	converter: ConverterState,
	scrollRestoration: ScrollRestorationState,
	
	globalStats: GlobalStatsState,
}
