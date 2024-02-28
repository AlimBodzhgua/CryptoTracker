import { CountStateSchema } from '../reducers/countReducer';
import { coinApi } from '../api/coinApi';

export interface StateSchema {
	count: CountStateSchema,

	[coinApi.reducerPath]: ReturnType<typeof coinApi.reducer>,
}
