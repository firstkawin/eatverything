import { Controller, Get, HttpCode, HttpStatus, Post, Body, Logger, Res } from '@nestjs/common';
import { WebhookService } from './webhook.service';


@Controller('webhook')
export class WebhookController {

    constructor(
        private service: WebhookService
    ) { }

    @Post()
    get(@Body() body, @Res() res) {
        // Logger.log(body)
        // Logger.log(body.events[0].replyToken)
        let uid = body.events[0].source.userId
        let typeMessage = body.events[0].type
        let replyToken = null
        let text = null
        
        switch (typeMessage) {

            case 'postback':
                replyToken = body.events[0].replyToken
                text = body.events[0].postback.data
                this.service.handleText(replyToken, text, uid)
                return true
            case 'message':
                replyToken = body.events[0].replyToken
                text = body.events[0].message.text
                this.service.handleText(replyToken, text, uid)
                return true
        }

        return res.status(200).send()
    }
}

