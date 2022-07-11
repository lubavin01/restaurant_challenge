import { Injectable } from '@nestjs/common';
import { Table } from './table/schemas/table.schema';
import { TableService } from './table/table.service';
import { WaitingListService } from './waiting-list/waiting-list.service';

export interface IBookResult {
  tables: { tableId: string; chairsToOccupy: number }[];
  waitingNumbers?: number[];
}

@Injectable()
export class RestaurantService {
  constructor(
    private tableService: TableService,
    private waitingListService: WaitingListService,
  ) {}

  public async initializeTablesChairs(
    tablesCount: number,
    chairsCount: number,
  ): Promise<Table[]> {
    await this.waitingListService.truncate();

    return this.tableService.initializeTables(tablesCount, chairsCount);
  }

  public getAllTables(): Promise<Table[]> {
    return this.tableService.getAllTables();
  }

  public async book(clientsCount: number): Promise<IBookResult> {
    const tables = await this.tableService.getAllUnocuppiedTables();
    let count = clientsCount;

    const bookResult: IBookResult = { tables: [] };

    for (const table of tables) {
      const toBookCount = Math.min(table.chairCount, count);

      table.isOccupied = true;
      table.chairsOcuppied = toBookCount;
      await this.tableService.updateTable(table._id, table);

      bookResult.tables.push({
        tableId: table.tableId,
        chairsToOccupy: toBookCount,
      });

      count -= toBookCount;
      if (count === 0) {
        break;
      }
    }

    if (count > 0) {
      bookResult.waitingNumbers = await this.waitingListService.addMany(count);
    }

    return bookResult;
  }
}
