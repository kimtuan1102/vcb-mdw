export class ExchangeRate {
    currency_code: string;
    currency_name: string;
    buy: string;
    transfer: string;
    sell: string;

    constructor(partial: Partial<ExchangeRate>) {
        Object.assign(this, partial)
    }
}