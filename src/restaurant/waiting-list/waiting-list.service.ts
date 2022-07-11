import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter, CounterDocument } from './schemas/counter.schema';
import {
  WaitingList,
  WaitingListDocument,
} from './schemas/waiting-list.schema';

@Injectable()
export class WaitingListService {
  constructor(
    @InjectModel(WaitingList.name)
    private waitingListModel: Model<WaitingListDocument>,

    @InjectModel(Counter.name)
    private counterModel: Model<CounterDocument>,
  ) {}

  public async addMany(count: number): Promise<number[]> {
    const arr = [...Array(count)].map((item, index) => (item = index + 1));
    const saved: WaitingList[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const item of arr) {
      const elem = new this.waitingListModel();
      saved.push(await elem.save());
    }

    return saved.map((item) => item.waitingNumber);
  }

  public async truncate(): Promise<void> {
    await Promise.all([
      this.waitingListModel.deleteMany(),
      this.counterModel.deleteMany(),
    ]);
  }
}
