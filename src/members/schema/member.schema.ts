import * as mongoose from 'mongoose';

export const MemberSchema = new mongoose.Schema({
  uid: String,
  username: String
});