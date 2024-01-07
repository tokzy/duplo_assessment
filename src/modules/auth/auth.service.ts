import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from '@app/common/services/hashing/hashing';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '@app/modules/user/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import { UserService } from '@app/modules/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';

import {
  changePasswordDto,
  forgetPasswordDto,
  ResetPasswordDto,
} from './dto/resetpassword.dto';
import { ApiResponse } from '@app/common/interfaces/api.response';
import { UserState } from '@app/modules/user/enums/user.enum';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtservice: JwtService,
    private userService: UserService,
    private hashingservice: HashingService,
  ) {}

  async registerBusiness(
    CreateAuthDto: CreateAuthDto,
  ): Promise<ApiResponse<DeepPartial<User>>> {
    const { email, phoneNumber } = CreateAuthDto;
    try {
      const useremail = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });

      if (useremail) {
        throw new HttpException(
          'Email Already Exist For a Customer!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const userphone = await this.userRepository.findOne({
        where: {
          phoneNumber: phoneNumber,
        },
      });

      if (userphone) {
        throw new HttpException(
          'Phone Number Already Exist For a Customer!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const saveUserInfo = await this.userRepository.save(CreateAuthDto);

      const hashpass = await this.hashingservice.HashPassword(
        CreateAuthDto.password,
      );

      const auth = new Auth();
      auth.user = saveUserInfo;
      auth.password = hashpass;
      await auth.save();
      const { password, ...data } = saveUserInfo;

      return {
        statusCode: 200,
        message: 'Registration Succesful',
        data: data,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAuth(authUser: FindOptionsWhere<Auth>): Promise<Auth> {
    try {
      const auth = await this.authRepository.findOneBy(authUser);
      return auth;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(LoginAuthDto: LoginAuthDto): Promise<any> {
    const { email, password } = LoginAuthDto;
    try {
      const user = await this.userService.getUser(email);

      if (!user) {
        throw new HttpException(
          'Invalid User Credentials',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (user?.status === UserState.INACTIVE) {
        throw new HttpException(
          'Account Suspended Kindly Contact Support!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const authDetails = await this.getAuth({
        user: { id: user.id },
      });

      const verify = await this.hashingservice.VerifyPassword(
        password,
        authDetails.password,
      );

      if (!verify) {
        throw new HttpException(
          'Invalid User Credentials',
          HttpStatus.BAD_REQUEST,
        );
      }
      const generateToken = await this.jwtservice.signAsync({ user });
      return {
        statusCode: 200,
        meessage: 'success',
        data: {
          accessToken: generateToken,
          user: user,
        },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
