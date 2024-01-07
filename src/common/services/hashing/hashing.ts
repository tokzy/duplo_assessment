import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { HashConstant } from '../../constants/hash.constants';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HashingService {
  constructor() {}

  async HashPassword(password: string): Promise<string> {
    return await this.BcryptHashing(password);
  }

  private async BcryptHashing(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, HashConstant.SALT);
    if (!hash) {
      throw new HttpException(
        'Hashing Of Password Failed...',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return hash;
  }

  async VerifyPassword(password: string, hash: string): Promise<boolean> {
    return this.BcryptVerify(password, hash);
  }

  private async BcryptVerify(
    password: string,
    hashed: string,
  ): Promise<boolean> {
    try {
      const verify = await bcrypt.compare(password, hashed);
      return verify;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async generateOTP(): Promise<string> {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
  async generateRef(): Promise<string> {
    const digits =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let OTP = '';
    for (let i = 0; i < 40; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
  async generaterandomBvn(): Promise<string> {
    const randNum = Math.floor(Math.random() * 900000000) + 100000000;
    const bvn = '22' + randNum;
    return bvn;
  }
}
