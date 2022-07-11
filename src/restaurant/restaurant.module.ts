import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { RestaurantService } from './restaurant.service';
import { Table, TableSchema } from './table/schemas/table.schema';
import { TableRepository } from './table/table.repository';
import { TableService } from './table/table.service';
import { Counter, CounterSchema } from './waiting-list/schemas/counter.schema';
import {
  WaitingList,
  WaitingListSchema,
} from './waiting-list/schemas/waiting-list.schema';
import { WaitingListService } from './waiting-list/waiting-list.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Table.name,
        useFactory: () => {
          return TableSchema;
        },
      },
      {
        name: Counter.name,
        useFactory: () => {
          return CounterSchema;
        },
      },
      {
        name: WaitingList.name,
        useFactory: (connection: Connection) => {
          WaitingListSchema.pre('save', async function () {
            const res = await connection
              .collection('counter')
              .findOneAndUpdate(
                { dataCollection: 'waitingList' },
                { $inc: { seq: 1 } },
                { upsert: true, returnDocument: 'after' },
              );

            this.waitingNumber = res.value.seq;
          });

          return WaitingListSchema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  providers: [
    RestaurantService,
    TableService,
    TableRepository,
    WaitingListService,
  ],
  exports: [RestaurantService],
})
export class RestaurantModule {}
