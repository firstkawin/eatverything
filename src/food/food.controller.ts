import { Controller, Get, Res, Logger, Query } from '@nestjs/common';
import { FoodService } from './food.service';


@Controller('food')
export class FoodController {

    constructor(private service: FoodService) { }

    @Get()
    getKapao(@Query('menu') menu, @Res() res) {
        Logger.log(menu)
        return this.service.getMenu(menu, res)
    }

    @Get('/confirmOrder')
    confirmOrder(@Res() res) {
        return res.redirect('https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.0-9/31486615_10214913665582351_965791060737272116_n.jpg?_nc_cat=105&_nc_oc=AQmugiY4YNHX_PcRiySFvlPdTXdyLhsiKnAYUwZuBRM6jgO159YGP0uR8kieSuEQgjI&_nc_ht=scontent.fbkk5-3.fna&oh=abd50f50ed2669015ba42590e3c4ed14&oe=5E3B4473')
    }
}
