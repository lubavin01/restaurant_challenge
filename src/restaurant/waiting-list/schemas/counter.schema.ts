import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'counter' })
export class Counter {
  @Prop()
  dataCollection: string;

  @Prop()
  seq: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
export type CounterDocument = Counter & Document;
