import { Injectable, Logger } from '@nestjs/common';
import * as request from 'request'
import * as line from '@line/bot-sdk';

import { order } from '../message/orderFood';
import { orderConfirm } from '../message/orderConfirm';
import { OrdersService } from '../orders/orders.service';

const config = {
    channelAccessToken: 'RSvati4oVjTqOQU8Z3n26gjz119g7M8X6BkNC51XVaNRt4/J28gazenQpvQav1SnITZe8qratTC2IqWvw8kfvjVtvJ2eUqtRQ7qOVF+EBfzDIQt26gcnoim9Lb9JsrC+AgC4Mpz1PjX9R60OfKZ+TQdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'ea72b76f2946fce9ad7b1e6b3070dde6'
};
const client = new line.Client(config);
@Injectable()
export class WebhookService {

    constructor(private orderService: OrdersService) { }

    handleText(replyToken: any, text: any, uid) {
        // Logger.log(text)
        switch (text) {
            case "สรุปรายการอาาหาร":
                return this.replyConfirmOrder(replyToken)
            case "อาหาร":
                return this.replyFood(replyToken)
            case "กระเพรา":
                return this.handleMessageEvent(replyToken, uid, 'กระเพรา')

        }

    }

    replyConfirmOrder(replyToken: any) {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {RSvati4oVjTqOQU8Z3n26gjz119g7M8X6BkNC51XVaNRt4/J28gazenQpvQav1SnITZe8qratTC2IqWvw8kfvjVtvJ2eUqtRQ7qOVF+EBfzDIQt26gcnoim9Lb9JsrC+AgC4Mpz1PjX9R60OfKZ+TQdB04t89/1O/w1cDnyilFU=}'
        }
        this.orderService.findAll().then(res => {
            Logger.log(res)
            Logger.log("orders")
            let body = JSON.stringify({
                replyToken: replyToken,
                messages: [{
                    "type": "flex",
                    "altText": 'ทดสอบ',
                    "contents": orderConfirm(res)
                }]
            })
            request.post({
                url: 'https://api.line.me/v2/bot/message/reply',
                headers: headers,
                body: body
            }, (err, res, body) => {
                console.log('status = ' + res.statusCode);
            });
        })

        // console.log(orderConfirm())

    }

    replyFood(replyToken: any) {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {RSvati4oVjTqOQU8Z3n26gjz119g7M8X6BkNC51XVaNRt4/J28gazenQpvQav1SnITZe8qratTC2IqWvw8kfvjVtvJ2eUqtRQ7qOVF+EBfzDIQt26gcnoim9Lb9JsrC+AgC4Mpz1PjX9R60OfKZ+TQdB04t89/1O/w1cDnyilFU=}'
        }
        // Logger.log(order())
        let body = JSON.stringify({
            replyToken: replyToken,
            messages: [{
                "type": "flex",
                "altText": 'ทดสอบ',
                "contents": order()
            }]
        })
        request.post({
            url: 'https://api.line.me/v2/bot/message/reply',
            headers: headers,
            body: body
        }, (err, res, body) => {
            console.log('status = ' + res.statusCode);
        });
    }

    handleMessageEvent(replyToken, uid, menu) {
        if(uid === "U6f0bc2b67c20b331df2e8652acf7d8af"){
            uid = 'เฟริสท์'
        }
        this.orderService.create({
            name: uid,
            menu: menu
        })
        return client.replyMessage(replyToken, {
            type: 'text',
            text: `${uid} - กระเพรา`
        });
    }





}
