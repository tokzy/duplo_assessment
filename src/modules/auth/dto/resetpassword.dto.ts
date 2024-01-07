import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  newPassword: string;
}

export class forgetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class changePasswordDto extends PickType(ResetPasswordDto, [
  'newPassword',
] as const) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}
