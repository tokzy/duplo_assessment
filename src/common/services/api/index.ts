import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { apiDto } from './api.dto';
import axios from './client';

@Injectable()
export class ApiService {
  async SendOrderDetails(apiDto: apiDto) {
    try {
      const Response = await axios({
        url: `/log-tax`,
        method: 'POST',
        data: apiDto,
      });
      return Response.data;
    } catch (error) {
      if (error.message.includes('getaddrinfo ENOTFOUND')) {
        throw new Error('Service is not Reachable');
      } else {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
