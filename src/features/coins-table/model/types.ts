import { Coin } from 'shared/types/coin';
import { SortDirection, TagList } from './constants';

export type SortDirectionType = typeof SortDirection[keyof typeof SortDirection];
export type FieldNameType = keyof Omit<Coin, 'iconUrl' | 'symbol' | 'uuid'>;
export type TagType = typeof TagList[keyof typeof TagList];
export type CoinSelectionType = 'selected' | 'unselected';
