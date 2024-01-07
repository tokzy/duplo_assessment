import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { User } from '../user/entities/user.entity';
import { HashingService } from '@app/common/services/hashing/hashing';

@Module({
  imports: [TypeOrmModule.forFeature([User, Department])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, HashingService],
})
export class DepartmentsModule {}
