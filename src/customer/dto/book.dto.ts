import { IsInt, Min } from 'class-validator';

export class BookDto {
  @IsInt()
  @Min(1)
  clientsCount: number;
}
