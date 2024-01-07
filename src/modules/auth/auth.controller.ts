import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RemoveNullInterceptor } from 'src/common/interceptors/removenull';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('business/register')
  async register(@Body() CreateAuthDto: CreateAuthDto) {
    return await this.authService.registerBusiness(CreateAuthDto);
  }

  @Post('business/login')
  @UseInterceptors(RemoveNullInterceptor)
  async login(@Body() LoginAuthDto: LoginAuthDto) {
    return await this.authService.login(LoginAuthDto);
  }
}
