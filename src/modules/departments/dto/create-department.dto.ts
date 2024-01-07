import { UserRole } from '@app/modules/auth/enums/auth.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  DeptName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  phoneNumber: string;

  @IsOptional()
  @IsEnum(UserRole)
  roles?: UserRole;
}
