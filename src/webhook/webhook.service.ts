import { Injectable, Logger } from '@nestjs/common';
import * as request from 'request'
import * as line from '@line/bot-sdk';
import { ConfigService } from 'nestjs-config';
import { order } from '../message/orderFood';
import { orderConfirm } from '../message/orderConfirm';
import { OrdersService } from '../orders/orders.service';
import { MembersService } from '../members/members.service';
import { menu } from '../message/menu';
import { orderReceipt } from '../message/orderReceipt';
import { help } from '../message/help';


const channelAccessToken = 'RSvati4oVjTqOQU8Z3n26gjz119g7M8X6BkNC51XVaNRt4/J28gazenQpvQav1SnITZe8qratTC2IqWvw8kfvjVtvJ2eUqtRQ7qOVF+EBfzDIQt26gcnoim9Lb9JsrC+AgC4Mpz1PjX9R60OfKZ+TQdB04t89/1O/w1cDnyilFU='
const channelSecret = 'ea72b76f2946fce9ad7b1e6b3070dde6'
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer {${channelAccessToken}}`
}
const configLine = { channelAccessToken, channelSecret }
const client = new line.Client(configLine);
var orderId = 1;

@Injectable()
export class WebhookService {

    constructor(
        private orderService: OrdersService,
        private memberService: MembersService,
        private readonly config: ConfigService
    ) { this.config = config; }

    handleMessageEvent(body) {
        let uid = body.events[0].source.userId
        let typeMessage = body.events[0].type
        let replyToken = null
        let text = null
        Logger.log(uid)
        switch (typeMessage) {

            case 'postback':
                replyToken = body.events[0].replyToken
                text = body.events[0].postback.data
                this.handleText(replyToken, text, uid)
                return true
            case 'message':
                replyToken = body.events[0].replyToken
                text = body.events[0].message.text
                this.handleText(replyToken, text, uid)
                return true
        }

    }

    handleText(replyToken: any, replyText: any, uid) {
        const text = replyText.split(' ')
        const event = text[0]
        const subject = text[1]
        Logger.log(text)
        switch (event) {
            case "help":
                return this.replyHelp(replyToken)
            case "Help":
                return this.replyHelp(replyToken)
            case "สั่ง":
                return this.replyOrderMessage(replyToken, uid, subject)
            case "ยืนยันรายการ":
                return this.replyReceiptOrder(replyToken)
            case "ลบรายการ":
                this.orderService.delete();
                orderId = 1
                return client.replyMessage(replyToken, { type: 'text', text: 'ลบรายการเสร็จสิ้น' })
            case "ดูรายการ":
                return this.replyConfirmOrder(replyToken)
            case "เมนู":
                return this.replyFood(replyToken)
            case "กระเพรา":
                return this.replyOrderMessage(replyToken, uid, 'กระเพรา')
            case "สมัครสมาชิก":
                const body = { uid: uid, username: subject }
                this.memberService.register(body)
                return client.replyMessage(replyToken, { type: 'text', text: `สมัครสมาชิกเสร็จสิ้น ${subject}` })
            case "ยกเลิกสมาชิก":
                this.memberService.removeId(uid)
                return client.replyMessage(replyToken, { type: 'text', text: `ยกเลิกสมาชิกเสร็จสิ้น` })
            case "ลบรายการที่":
                this.orderService.removeOrder(subject)
                return client.replyMessage(replyToken, { type: 'text', text: `ลบรายการที่${subject}สำเร็จ` })

        }

    }

    replyHelp(replyToken: any) {
        this.orderService.findAll().then(res => {
            let body = JSON.stringify({
                replyToken: replyToken,
                messages: [{
                    "type": "flex",
                    "altText": 'ทดสอบ',
                    "contents": help
                }]
            })
            this.requestPostMessge(body)
        })
    }

    replyReceiptOrder(replyToken: any) {
        this.orderService.findAll().then(res => {
            let body = JSON.stringify({
                replyToken: replyToken,
                messages: [{
                    "type": "flex",
                    "altText": 'ทดสอบ',
                    "contents": orderReceipt(res)
                }]
            })
            this.requestPostMessge(body)
        })
    }

    replyConfirmOrder(replyToken: any) {
        this.orderService.findAll().then(res => {
            let body = JSON.stringify({
                replyToken: replyToken,
                messages: [{
                    "type": "flex",
                    "altText": 'ทดสอบ',
                    "contents": orderConfirm(res)
                }]
            })
            this.requestPostMessge(body)
        })
    }

    replyFood(replyToken: any) {
        let body = JSON.stringify({
            replyToken: replyToken,
            messages: [{
                "type": "flex",
                "altText": 'ทดสอบ',
                "contents": order()
            }]
        })
        this.requestPostMessge(body)
    }

    replyOrderMessage(replyToken, uid, menu) {
        this.memberService.findUser(uid).then(res => {
            let name = res[0].username
            this.orderService.create({ orderId: orderId, name: name, menu: menu })
            orderId++
            return client.replyMessage(replyToken, { type: 'text', text: `คุณ${name}สั่ง  "${menu}" สำเร็จ` })
        })
    }

    requestPostMessge(body: any) {
        request.post({
            url: 'https://api.line.me/v2/bot/message/reply',
            headers: headers,
            body: body
        }, (err, res, body) => {
            console.log('status = ' + res.statusCode);
        });
    }

}
