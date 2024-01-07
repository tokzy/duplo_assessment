import { User } from '@app/modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum paymentStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  itemName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  platform_code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(paymentStatus)
  status: paymentStatus;

  @IsOptional()
  business?: User;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  departmentId: string;
}


export class logMongoDbDto {
  @IsNotEmpty()
  @IsString()
  businessID: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}