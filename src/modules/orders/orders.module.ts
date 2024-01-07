import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Department } from '../departments/entities/department.entity';
import { DepartmentsService } from '../departments/departments.service';
import { User } from '../user/entities/user.entity';
import { HashingService } from '@app/common/services/hashing/hashing';
import { ApiService } from '@app/common/services/api';
import { BullModule } from '@nestjs/bull';
import { TaxQueueProcessor } from '../queues/queues.processor';
import {MongooseModule} from '@nestjs/mongoose'
import { Orders, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Department, User]),
    BullModule.registerQueue({
      name: 'tax',
    }),
    MongooseModule.forFeature([{ name: Orders.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    DepartmentsService,
    HashingService,
    ApiService,
    TaxQueueProcessor,
  ],
})
export class OrdersModule {}
