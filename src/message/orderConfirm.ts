import { ConfigService } from 'nestjs-config';
export function orderConfirm(orderAll) {

    let items = [1, 2, 3]
    let orders = [{
        "type": "box",
        "layout": "baseline",
        "contents": [
            {
                "type": "text",
                "text": `รหัส`,
                "size": "sm"
            },
            {
                "type": "text",
                "text": `เมนู`,
                "weight": "bold",
                "margin": "sm",
                "flex": 0,
                "align": "end",
            },
            {
                "type": "text",
                "text": " ",
                "size": "sm",
                "align": "end",
                "color": "#dc3545",
            }
        ],
    },]
    orderAll.map((value) => {
        // console.log(value)
        let message = {
            "type": "box",
            "layout": "baseline",
            "contents": [
                {
                    "type": "text",
                    "text": `${value.orderId}.`,
                    "size": "sm"
                },
                {
                    "type": "text",
                    "text": `${value.name} - ${value.menu}`,
                    "weight": "bold",
                    "margin": "sm",
                    "flex": 0,
                    "align": "end",
                },
                {
                    "type": "text",
                    "text": "ลบ",
                    "size": "sm",
                    "align": "end",
                    "color": "#dc3545",
                    "action": {
                        "type": "message",
                        "label": "action",
                        "text": `ลบรายการที่ ${value.orderId}`
                    },
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
            "spacing": "md",
            "contents": [
                {
                    "type": "text",
                    "text": "รายการสั่งอาหาร",
                    "size": "xl",
                    "weight": "bold"
                },

                {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": orders
                },

            ]
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "spacer",
                    "size": "xxl"
                },
                {
                    "type": "button",
                    "style": "primary",
                    "color": "#905c44",
                    "action": {
                        "type": "postback",
                        "label": "ยืนยันรายการ",
                        "data": "ยืนยันรายการ"
                    }
                }
            ]
        }
    }
    return msg
}