import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  device_token?: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  password: string;
}

export class setPinDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumberString()
  pin: string;
}

export class changePinDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumberString()
  oldPin: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumberString()
  newPin: string;
}

export class verifyPinDto extends PickType(setPinDto, ['pin'] as const) {}
