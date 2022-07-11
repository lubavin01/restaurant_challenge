import { Injectable } from '@nestjs/common';
import { Table } from './schemas/table.schema';
import { TableRepository } from './table.repository';

@Injectable()
export class TableService {
  constructor(private tableRepository: TableRepository) {}

  public async initializeTables(
    tablesCount: number,
    chairCount: number,
  ): Promise<Table[]> {
    await this.tableRepository.deleteAll();

    const tableNames = [...Array(tablesCount)].map(
      (item, index) => (item = `T${index + 1}`),
    );

    const promises = tableNames.map((item) =>
      this.tableRepository.create({
        tableId: item,
        isOccupied: false,
        chairCount: chairCount,
        chairsOcuppied: 0,
      }),
    );

    const tables = await Promise.all(promises);
    return tables;
  }

  getAllTables(): Promise<Table[]> {
    return this.tableRepository.findMany({});
  }

  getAllUnocuppiedTables(): Promise<Table[]> {
    return this.tableRepository.findMany({ isOccupied: false });
  }

  updateTable(id: string, data: Partial<Table>): Promise<Table> {
    return this.tableRepository.updateById(id, data);
  }
}
