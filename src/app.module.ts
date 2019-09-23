import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { FoodModule } from './food/food.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from 'nestjs-config';
import { MembersModule } from './members/members.module';
import * as path from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    WebhookModule, FoodModule, OrdersModule, MembersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
