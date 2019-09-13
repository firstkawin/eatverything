import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { FoodModule } from './food/food.module';
import { OrdersModule } from './orders/orders.module';
import { OrderSchema } from './orders/schema/order.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    WebhookModule, FoodModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
