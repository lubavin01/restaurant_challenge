import { Injectable } from '@nestjs/common';
import {
  IBookResult,
  RestaurantService,
} from 'src/restaurant/restaurant.service';
import { Table } from 'src/restaurant/table/schemas/table.schema';

@Injectable()
export class CustomerService {
  constructor(private restaurantService: RestaurantService) {}

  public async getAllTables(): Promise<Table[]> {
    return this.restaurantService.getAllTables();
  }

  public book(clientsCount: number): Promise<IBookResult> {
    return this.restaurantService.book(clientsCount);
  }
}
