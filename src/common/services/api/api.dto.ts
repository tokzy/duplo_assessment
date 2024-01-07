import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class apiDto {
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsNotEmpty()
  @IsNumberString()
  platform_code: string;

  @IsNotEmpty()
  @IsNumber()
  order_amount: number;
}
