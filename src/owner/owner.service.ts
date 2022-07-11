import { Injectable } from '@nestjs/common';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Table } from 'src/restaurant/table/schemas/table.schema';

@Injectable()
export class OwnerService {
  constructor(private restaurantService: RestaurantService) {}
  public async initializeTablesChairs(
    tableCount: number,
    chairCount: number,
  ): Promise<Table[]> {
    return this.restaurantService.initializeTablesChairs(
      tableCount,
      chairCount,
    );
  }
}
