import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'tables' })
export class Table {
  _id?: string;

  @Prop()
  tableId: string;

  @Prop()
  isOccupied: boolean;

  @Prop()
  chairCount: number;

  @Prop()
  chairsOcuppied: number;
}

export const TableSchema = SchemaFactory.createForClass(Table);
export type TableDocument = Table & Document;
