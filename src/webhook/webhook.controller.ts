import { Controller, Get, HttpCode, HttpStatus, Post, Body, Logger, Res } from '@nestjs/common';
import { WebhookService } from './webhook.service';


@Controller('webhook')
export class WebhookController {

    constructor(
        private service: WebhookService
    ) { }

    @Post()
    get(@Body() body, @Res() res) {
       this.service.handleMessageEvent(body)
        return res.status(200).send()
    }
}

