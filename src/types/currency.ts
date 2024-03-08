import { Currencies } from 'constants/currencies';

export type CurrencyType = keyof typeof Currencies;

export interface IKurs {
    RUB: number;
    EUR: number
}
