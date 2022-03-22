import {Controller, Get, Query} from '@nestjs/common';
import {ChatService} from "./chat.service";
import {SimpleAuth} from "../../decorators/http.decorator";
import {ApiTags} from "@nestjs/swagger";

@Controller('chat')
@ApiTags('Chat text')
export class ChatController {
    constructor(
        private chatSvc: ChatService
    ) {
    }
    @Get('exchange-rate')
    @SimpleAuth()
    exchangeRate(@Query('currency_code') currencyCode: string) {
        return this.chatSvc.exchangeRate(currencyCode)
    }
}
