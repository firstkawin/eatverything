import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IMember } from './interface/member.interface';
import { Model } from 'mongoose';

@Injectable()
export class MembersService {
    constructor(@InjectModel('Members') private readonly memberModel: Model<IMember>) { }

    async register(body) {
        const createdUser = new this.memberModel(body);
        return await createdUser.save();
    }

    async removeId(uid) {
        
        return await this.memberModel.deleteOne({"uid": uid});
    }


    async findUser(uid) {
       
        return await this.memberModel.find({uid:uid})
    }


}
