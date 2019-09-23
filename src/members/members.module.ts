import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema } from './schema/member.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Members', schema: MemberSchema }])],
  providers: [MembersService],
  controllers: [MembersController],
  exports:[MembersService],
})
export class MembersModule {}
