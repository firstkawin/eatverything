import { ConfigService } from 'nestjs-config';
export function orderReceipt(orderAll) {

    let items = [1, 2, 3]
    let orders = []
    orderAll.map((value, index) => {
        // console.log(value)
        let message = {
            "type": "box",
            "layout": "baseline",
            "spacing": "md",
            "contents": [
                {
                    "type": "text",
                    "text": `${index+1}.`,
                    "size": "sm"
                },
                {
                    "type": "text",
                    "text": `${value.name} - ${value.menu}`,
                    "margin": "sm",
                    "flex": 0,
                    "align": "end",
                },
                {
                    "type": "text",
                    "text": " ",
                    "size": "sm",
                    "align": "start",
                    "color": "#dc3545",
                }
            ],
            "action": {
                "type": "message",
                "label": "action",
                "text": "hello"
            }
        }

        return orders.push(message)
    })

    console.log(orders)


    let msg = {
        "type": "bubble",
        "hero": {
            "type": "image",
            "url": `${ConfigService.get('config.localhost')}/food/confirmOrder`,
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            
            "contents": [
                {
                    "type": "text",
                    "text": "รายการสั่งอาหาร",
                    "size": "md",
                    "weight": "bold"
                },

                {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": orders
                },

            ]
        }
    }
    return msg
}