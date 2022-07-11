import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Table, TableDocument } from './schemas/table.schema';

export class TableRepository {
  constructor(
    @InjectModel(Table.name) private tableModel: Model<TableDocument>,
  ) {}

  public async create(table: Table): Promise<Table> {
    const instance = new this.tableModel(table);
    return instance.save();
  }

  public async findOne(filter: FilterQuery<Table>): Promise<Table> {
    return this.tableModel.findOne(filter);
  }

  public async findMany(filter: FilterQuery<Table>): Promise<Table[]> {
    return this.tableModel.find(filter).sort('tableId');
  }

  public async deleteAll(): Promise<void> {
    await this.tableModel.deleteMany();
  }

  public async updateById(id: string, data: Partial<Table>): Promise<Table> {
    const result = await this.tableModel.findByIdAndUpdate(id, data, {
      new: true,
      lean: true,
    });

    return result;
  }
}
