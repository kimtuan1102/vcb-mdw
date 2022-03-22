import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import * as convert from "xml-js";

import {VCB_COLLECT_DATA_PATH} from "../../common/constants/vcb";
import {ExchangeRate} from "../chat/dto/exchange-rate.dto";
import {ExchangeRateList} from "../chat/dto/exchange-rate-list.dto";

@Injectable()
export class CollectService {
    constructor(
        private httpSvc: HttpService,
        private configSvc: ConfigService
    ) {
    }

    public async exchangeRate(): Promise<ExchangeRateList> {
        const vcbEndPoint = this.configSvc.get<string>('VCB_PORTAL_ENDPOINT');
        const exchangeRateUrl = `${vcbEndPoint}/${VCB_COLLECT_DATA_PATH.TyGia}`
        const response = (await this.httpSvc.get(exchangeRateUrl).toPromise()).data

        const exchangeRatesJson = convert.xml2json(response, {compact: true, spaces: 4, trim: true});
        const exchangeRatesObj = JSON.parse(exchangeRatesJson)
        const _exchangesRate = exchangeRatesObj.ExrateList.Exrate;
        const exchangesRateUpdateTime = exchangeRatesObj.ExrateList.DateTime._text;

        const _listExchangeRates: ExchangeRate[] = []
        for (const exchangeRate of _exchangesRate) {
            const _exchangeRate = exchangeRate._attributes;
            const exchangeRateObj = new ExchangeRate({
                currency_code: _exchangeRate.CurrencyCode,
                currency_name: _exchangeRate.CurrencyName,
                buy: _exchangeRate.Buy,
                transfer: _exchangeRate.Transfer,
                sell: _exchangeRate.Sell
            })
            _listExchangeRates.push(exchangeRateObj)
        }
        const listExchangeRates = new ExchangeRateList(
            {
                exchange_rates: _listExchangeRates,
                date: exchangesRateUpdateTime
            }
        )
        //TODO CACHE 5 minutes
        return listExchangeRates
    }

}
