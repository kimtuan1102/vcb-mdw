import * as _ from 'lodash'

import {ExchangeRate} from "./exchange-rate.dto";

export class ExchangeRateList {
    exchange_rates: ExchangeRate[];
    date: string

    constructor(partial: Partial<ExchangeRateList>) {
        Object.assign(this, partial)
    }

    public findExchangeRateByCode(currencyCode: string): ExchangeRate {
        const exchangeRate = _.find(this.exchange_rates, o => {
            return currencyCode === o.currency_code
        })
        if (!exchangeRate)

        return exchangeRate
    }
}