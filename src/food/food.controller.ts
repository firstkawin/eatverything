import { Controller, Get, Res, Logger } from '@nestjs/common';
import { FoodService } from './food.service';


@Controller('food')
export class FoodController {

    constructor(private service: FoodService) { }

    @Get()
    get(@Res() res) {
        let items = [1]
        let orders = items.map((value)=>{
            let i = {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                    
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                            {
                                "type": "icon",
                                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/restaurant_regular_32.png"
                            },
                            {
                                "type": "text",
                                "text": "$10.5",
                                "weight": "bold",
                                "margin": "sm",
                                "flex": 0
                            },
                            {
                                "type": "text",
                                "text": "400kcl",
                                "size": "sm",
                                "align": "end",
                                "color": "#aaaaaa"
                            }
                        ],
                        "action": {
                            "type": "message",
                            "label": "action",
                            "text": "hello"
                        }
                    },
                ]
            }
            return i
        })
        Logger.log(orders)
        return JSON.stringify(orders)
    }

    @Get('/kapao')
    get1(@Res() res) {
        return res.redirect('https://sites.google.com/site/buntharukaaunaun55/_/rsrc/1480471453964/xahar/phad-kra-phera-hmu/11.ผัดกระเพราหมู_6_1.1.180_490X960.Jpeg');
    }

    @Get('/confirmOrder')
    confirmOrder(@Res() res){
        return res.redirect('https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.0-9/31486615_10214913665582351_965791060737272116_n.jpg?_nc_cat=105&_nc_oc=AQmugiY4YNHX_PcRiySFvlPdTXdyLhsiKnAYUwZuBRM6jgO159YGP0uR8kieSuEQgjI&_nc_ht=scontent.fbkk5-3.fna&oh=abd50f50ed2669015ba42590e3c4ed14&oe=5E3B4473')
    }
}
