import { ConfigService } from 'nestjs-config';
import { menu } from './menu';
import { Logger } from '@nestjs/common';
export function order() {
   let allMenu = menu.map((value)=>{
        let menu1 = {
            "type": "bubble",
            "hero": {
                "type": "image",
                "size": "full",
                "aspectRatio": "20:13",
                "aspectMode": "cover",
                "url": `${ConfigService.get('config.localhost')}/food?menu=${value.image}`
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                    {
                        "type": "text",
                        "text": `${value.name}`,
                        "wrap": true,
                        "weight": "bold",
                        "size": "xl"
                    },
                    // {
                    //     "type": "box",
                    //     "layout": "baseline",
                    //     "contents": [
                    //         {
                    //             "type": "text",
                    //             "text": "40 Bath",
                    //             "wrap": true,
                    //             "weight": "bold",
                    //             "size": "xl",
                    //             "flex": 0
                    //         }
                    //     ]
                    // }
                ]
            },
            "footer": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                    {
                        "type": "button",
                        "style": "primary",
                        "action": {
                            "type": "postback",
                            "label": `${value.name}`,
                            "data": `สั่ง ${value.name}`
                        }
                    },
                    {
                        "type": "button",
                        "style": "primary",
                        "action": {
                            "type": "postback",
                            "label": `${value.option1}`,
                            "data": `สั่ง ${value.option1}`
                        }
                    },
                    {
                        "type": "button",
                        "style": "primary",
                        "action": {
                            "type": "postback",
                            "label": `${value.option2}`,
                            "data": `สั่ง ${value.option2}`
                        }
                    },
                ]
            }
        }
        return menu1
    })
    let msg = {
        "type": "carousel",
        "contents": allMenu
    }
    Logger.log(msg)
    return msg
}
