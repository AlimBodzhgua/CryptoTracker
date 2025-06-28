import { UserState, userSlice } from 'features/user';
import { coinsSlice, CoinsState } from 'features/coins-table';
import { currencySlice, CurrencyState } from 'features/currency';
import { converterSlice, ConverterState } from 'features/coin-converter';
import { scrollRestorationSlice, ScrollRestorationState } from 'features/page';
import { globalStatsSlice, GlobalStatsState } from 'features/global-stats';

export interface AppState {
	[coinsSlice.name]: CoinsState,
	[currencySlice.name]: CurrencyState,
	[userSlice.name]: UserState,
	[converterSlice.name]: ConverterState,
	[scrollRestorationSlice.name]: ScrollRestorationState,
	[globalStatsSlice.name]: GlobalStatsState,
}
