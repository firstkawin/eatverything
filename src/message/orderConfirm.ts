export function orderConfirm(orderAll) {

    let items = [1, 2, 3]
    let orders = orderAll.map((value) => {
        // console.log(value)
        let message = {
            "type": "box",
            "layout": "baseline",
            "contents": [
                {
                    "type": "icon",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/restaurant_regular_32.png"
                },
                {
                    "type": "text",
                    "text": `${value.name} - ${value.menu}`,
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
        }

        return message
    })

    // console.log(orders[0])


    let msg = {
        "type": "bubble",
        "hero": {
            "type": "image",
            "url": "https://1c635567.ngrok.io/food/confirmOrder",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "action": {
                "type": "uri",
                "uri": "https://linecorp.com"
            }
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "action": {
                "type": "uri",
                "uri": "https://linecorp.com"
            },
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
                        "type": "uri",
                        "label": "Add to Cart",
                        "uri": "https://linecorp.com"
                    }
                }
            ]
        }
    }
    return msg
}