import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  orderId: String,
  name: String,
  menu: String
});