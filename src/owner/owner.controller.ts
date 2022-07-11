import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { InitializeDto } from './dto/initialize.dto';
import { OwnerService } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Post('initialize')
  @HttpCode(201)
  async initializeTablesChairs(@Body() initializeDto: InitializeDto) {
    return this.ownerService.initializeTablesChairs(
      initializeDto.tableCount,
      initializeDto.chairCount,
    );
  }
}
