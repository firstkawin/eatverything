import { Controller, Post, Get } from '@nestjs/common';
import { MembersService } from './members.service';
import { finished } from 'stream';

@Controller('members')
export class MembersController {
    constructor(private memberService: MembersService) { }

    @Post()
    register(body) {
        return null
    }
}
