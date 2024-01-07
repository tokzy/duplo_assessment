import { ApiResponse } from '@app/common/interfaces/api.response';
import { apiDto } from '@app/common/services/api/api.dto';
import { InjectQueue } from '@nestjs/bull';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { DataSource, Repository } from 'typeorm';
import { DepartmentsService } from '../departments/departments.service';
import { User } from '../user/entities/user.entity';
import { CreateOrderDto, logMongoDbDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private departmentService: DepartmentsService,
    @InjectQueue('tax')
    private readonly processQueue: Queue,
    private dataSource: DataSource,
  ) {}

  async placeOrder(CreateOrderDto: CreateOrderDto, user: User): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      const checkDept = await this.departmentService.getDeptById(
        CreateOrderDto.departmentId,
      );

      if (!checkDept) {
        throw new Error('Invalid DepartmentId!');
      }

      // wrap in transaction to handle large concurrent orders
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const saveOrders = await this.orderRepository.save({
        department: checkDept,
        business: user,
        ...CreateOrderDto,
      });

      /* duplo is now expected to log the tax to the government here. quick solution is to run this 
in a background queue to not disrupt or slow down duplo orders
*/
      const apiDto: apiDto = {
        order_amount: CreateOrderDto.amount,
        order_id: saveOrders?.id,
        platform_code: CreateOrderDto.platform_code,
      };

      await this.processQueue.add('log_tax', apiDto, {
        attempts: 2,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      })
     const logDto:logMongoDbDto = {
      businessID:user.id,
      amount:CreateOrderDto.amount,
      status:CreateOrderDto.status,
     }
      // send  the transaction to the queue to log into mongodb
      await this.processQueue.add('log_transaction', logDto, {
        attempts: 2,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      });

      await queryRunner.commitTransaction();
      const { department, business, ...data } = saveOrders;
      return {
        statusCode: 200,
        message: 'success',
        data: data,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async getOrderByDepartment(
    departmentId: string,
    user: User,
  ): Promise<ApiResponse<Order[]>> {
    try {
      const fetchOrders = await this.orderRepository.find({
        where: {
          department: { id: departmentId },
          business: { id: user.id },
        },
      });
      return {
        statusCode: 200,
        message: 'success',
        data: fetchOrders,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getOrdersDetails(user: User): Promise<any> {
    const today = new Date();
    const startOfToday = startOfDay(today); // Start of today
    const endOfToday = endOfDay(today); // End of today
    try {
      const fetchtotalAmountOfOrders = await this.orderRepository
        .createQueryBuilder('order')
        .select('SUM(order.amount)', 'total')
        .where('order.business = :name', { name: user.id })
        .getRawOne();
      const totalAmountOfOrders = fetchtotalAmountOfOrders?.total || 0;
      const totalNumberOfOrders = await this.orderRepository.count({
        where: {
          business: { id: user.id },
        },
      });

      const fetchTotalAmountOfOrdersToday = await this.orderRepository
        .createQueryBuilder('order')
        .select('SUM(order.amount)', 'total')
        .where('order.business = :name', { name: user.id })
        .andWhere('order.createdAt BETWEEN :start AND :end', {
          start: startOfToday,
          end: endOfToday,
        })
        .getRawOne();
      const totalAmountToday = fetchTotalAmountOfOrdersToday.total || 0;
      const totalNumberOfOrdersToday = await this.orderRepository
        .createQueryBuilder('order')
        .where('order.business = :id', { id: user.id })
        .andWhere('order.createdAt >= :start AND order.createdAt <= :end', {
          start: startOfToday,
          end: endOfToday,
        })
        .getCount();
      return {
        statusCode: 200,
        message: 'success',
        data: {
          totalAmountOfOrders: parseFloat(totalAmountOfOrders),
          totalNumberOfOrders: totalNumberOfOrders,
          totalAmountOfOrdersToday: parseFloat(totalAmountToday),
          totalNumberOfOrdersToday: totalNumberOfOrdersToday,
        },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async calculateCreditScore(user: User): Promise<any> {
    try {
      const fetchtotalAmountOfOrders = await this.orderRepository
        .createQueryBuilder('order')
        .select('SUM(order.amount)', 'total')
        .where('order.business = :name', { name: user.id })
        .getRawOne();

      const totalAmountOfOrders = fetchtotalAmountOfOrders?.total || 0;

      const totalNumberOfOrders = await this.orderRepository.count({
        where: {
          business: { id: user.id },
        },
      });

      const creditScore =
        parseFloat(totalAmountOfOrders) / (totalNumberOfOrders * 100);

      return {
        statusCode: 200,
        message: 'success',
        data: {
          businessName: user?.businessName,
          creditScore: parseFloat(creditScore.toFixed(2)),
        },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


}
