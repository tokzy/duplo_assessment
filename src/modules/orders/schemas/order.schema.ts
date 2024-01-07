import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Orders>;

@Schema()
export class Orders {
  @Prop({required:true})
  businessID: string;

  @Prop({required:true})
  amount: number;

  @Prop({required:true})
  status: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Orders);