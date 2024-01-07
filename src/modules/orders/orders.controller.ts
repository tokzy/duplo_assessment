import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@ApiBearerAuth('jwt')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  async placeOrder(
    @Body() CreateOrderDto: CreateOrderDto,
    @Request() req: any,
  ) {
    return await this.ordersService.placeOrder(CreateOrderDto, req.user);
  }

  @Get(':departmentId')
  async getOrders(
    @Param('departmentId') departmentId: string,
    @Request() req: any,
  ) {
    return await this.ordersService.getOrderByDepartment(
      departmentId,
      req.user,
    );
  }

  @Get('order-details/counts')
  async getOrderdetails(@Request() req: any) {
    return await this.ordersService.getOrdersDetails(req.user);
  }

  @Get('credit/score')
  async creditScore(@Request() req: any) {
    return await this.ordersService.calculateCreditScore(req.user);
  }
}
