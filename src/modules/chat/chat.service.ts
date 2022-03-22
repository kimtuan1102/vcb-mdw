import { Injectable } from '@nestjs/common';

import {CollectService} from "../collect/collect.service";


@Injectable()
export class ChatService {
    constructor(private collectSvc: CollectService) {
    }
    async exchangeRate(currencyCode: string) {
        const listExchangeRate = await this.collectSvc.exchangeRate()
        return listExchangeRate.findExchangeRateByCode(currencyCode)
    }
}
