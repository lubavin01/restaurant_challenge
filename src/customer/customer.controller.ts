import { Body, Controller, Get, Post } from '@nestjs/common';
import { IBookResult } from 'src/restaurant/restaurant.service';
import { Table } from 'src/restaurant/table/schemas/table.schema';
import { CustomerService } from './customer.service';
import { BookDto } from './dto/book.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('tables')
  async getAllTables(): Promise<Table[]> {
    return this.customerService.getAllTables();
  }

  @Post('book')
  async book(@Body() bookDto: BookDto): Promise<IBookResult> {
    return this.customerService.book(bookDto.clientsCount);
  }
}
