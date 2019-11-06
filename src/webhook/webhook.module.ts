import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { OrdersModule } from '../orders/orders.module';
import { MembersModule } from '../members/members.module';

@Module({
  imports:[OrdersModule, MembersModule],
  controllers: [WebhookController],
  providers: [WebhookService]
})
export class WebhookModule {}
