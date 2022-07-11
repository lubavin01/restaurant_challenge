import { IsInt, Min } from 'class-validator';

export class InitializeDto {
  @IsInt()
  @Min(1)
  tableCount: number;

  @IsInt()
  @Min(1)
  chairCount: number;
}
