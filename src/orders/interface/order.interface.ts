import { Document } from 'mongoose';

export interface IOrder extends Document {
  readonly orderId: string,
  readonly name: string,
  readonly menu: string
}
