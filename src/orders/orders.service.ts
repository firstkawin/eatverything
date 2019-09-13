import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IOrder } from './interface/order.interface';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<IOrder>) {}

    async findAll(){
        return await this.orderModel.find();
      }

    async create(createCatDto: any): Promise<IOrder> {
        Logger.log(createCatDto)
        const createdCat = new this.orderModel(createCatDto);
        return await createdCat.save();
      }
}
