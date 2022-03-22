import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import {CollectModule} from "../collect/collect.module";

@Module({
  imports: [CollectModule],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
