import type { ConverterCoinType, User } from './types';
import type { UserCredential } from 'firebase/auth';

export const createHistoryDoc = (
	coinFrom: ConverterCoinType,
	coinTo: ConverterCoinType,
	amount: number,
	result: number,
) => ({
	coinFrom: {
		symbol: coinFrom.symbol,
		name: coinFrom.name,
		iconUrl: coinFrom.iconUrl,
	},
	coinTo: {
		symbol: coinTo.symbol,
		name: coinTo.name,
		iconUrl: coinTo.iconUrl,
	},
	amount,
	convertResult: result,
});

export const getUserDataObject = (data: UserCredential): User => ({
	id: data.user.uid,
	email: data.user.email!,
	login: data.user.displayName || '',
	imageUrl: data.user.photoURL || '',
	password: data.user.refreshToken,
	isEmailVerified: data.user.emailVerified,
	conversionHistory: [],
	watchList: { ids: [], coins: [] },
});
