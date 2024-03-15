import { FieldNameType, ICoin, SortDirectionType } from 'types/coin';

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
