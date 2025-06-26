import { Currencies } from './constants';

export type CurrencyType = typeof Currencies[keyof typeof Currencies];

export type Kurs = {
    RUB: number;
    EUR: number
}
