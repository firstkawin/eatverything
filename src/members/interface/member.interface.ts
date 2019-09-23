import { Document } from 'mongoose';

export interface IMember extends Document {
  readonly uid: string,
  readonly username: string
}
