import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { SharedModule } from './shared/shared.module';
import { CollectModule } from './modules/collect/collect.module';
import { ChatModule } from './modules/chat/chat.module';
import { WebviewModule } from './modules/webview/webview.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SharedModule,
    CollectModule,
    ChatModule,
    WebviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
