import { Controller, Get, Param, Logger, Query, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private service: OrdersService){}
    @Get()
    get() {
        return this.service.findAll()
    }

    @Post('create')
    addOrder(@Query('name') id, @Query('menu') menu) {
        Logger.log(id)
        Logger.log(menu)
        return this.service.create({
            name: id,
            menu: menu
        })
    }

   
   
}
