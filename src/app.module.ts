import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QueueConfigModule } from './configs/queue.config';
import { DatabaseModule } from './database/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { OrdersModule } from './modules/orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    QueueConfigModule,
    MongooseModule.forRoot(`${process.env.MONGO_URL}`),
    AuthModule,
    UserModule,
    DepartmentsModule,
    OrdersModule,
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
