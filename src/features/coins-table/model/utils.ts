import type { Coin } from 'shared/types/coin';
import { SortDirectionType, FieldNameType } from './types';

export const coinsSorter = (
	coins: Coin[],
	sortDirection: SortDirectionType,
	fieldName: FieldNameType,
) => (
	[...coins].sort((a, b) => {
		if (fieldName === 'name') {
			if (sortDirection === 'asc') {
				return a[`${fieldName}`].localeCompare(b[`${fieldName}`]);
			}
			return b[`${fieldName}`].localeCompare(a[`${fieldName}`]);
		}
		if (sortDirection === 'desc') {
			return Number(a[`${fieldName}`]) - Number(b[`${fieldName}`]);
		}
		return Number(b[`${fieldName}`]) - Number(a[`${fieldName}`]);
	})
);
