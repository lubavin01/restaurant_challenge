import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { getNextCounter } from './counter.schema';

@Schema({ collection: 'waitingList' })
export class WaitingList {
  @Prop()
  waitingNumber: number;
}

export const WaitingListSchema = SchemaFactory.createForClass(WaitingList);
export type WaitingListDocument = WaitingList & Document;
