import { UserCredential } from 'firebase/auth';
import { FieldNameType, ICoin, SortDirectionType } from 'types/coin';
import { ConverterCoinType } from 'types/converter';
import { IUser } from 'types/user';

export const coinsSorter = (
    coins: ICoin[],
    sortDirection: SortDirectionType,
    fieldName: FieldNameType,
) => [...coins].sort((a, b) => {
    if (fieldName === 'name') {
        if (sortDirection === 'descending') {
            return a[`${fieldName}`].localeCompare(b[`${fieldName}`]);
        }
        return b[`${fieldName}`].localeCompare(a[`${fieldName}`]);
    }
	        if (sortDirection === 'descending') {
	            return Number(a[`${fieldName}`]) > Number(b[`${fieldName}`]) ? -1 : 1;
	        }
	        return Number(a[`${fieldName}`]) < Number(b[`${fieldName}`]) ? -1 : 1;
});

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

export const getUserDataObject = (data: UserCredential):IUser => ({
    id: data.user.uid,
    email: data.user.email!,
    login: data.user.displayName || '',
    imageUrl: data.user.photoURL || '',
    password: data.user.refreshToken,
    isEmailVerified: data.user.emailVerified,
    conversionHistory: [],
    watchList: [],
});
