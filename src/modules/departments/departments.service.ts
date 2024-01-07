import { ApiResponse } from '@app/common/interfaces/api.response';
import { HashingService } from '@app/common/services/hashing/hashing';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../auth/entities/auth.entity';
import { UserRole } from '../auth/enums/auth.enum';
import { User } from '../user/entities/user.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashingService: HashingService,
  ) {}

  async createDeptAccounts(
    CreateDepartmentDto: CreateDepartmentDto,
    user: User,
  ): Promise<ApiResponse<User>> {
    const { email, phoneNumber } = CreateDepartmentDto;
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

      const saveinfo = await this.userRepository.save({
        email: email,
        phoneNumber: phoneNumber,
        roles: [UserRole.DEPARTMENT],
      });

      const hashpass = await this.hashingService.HashPassword(
        CreateDepartmentDto.password,
      );
      const auth = new Auth();
      auth.user = saveinfo;
      auth.password = hashpass;
      await auth.save();

      await this.departmentRepository.save({
        DeptName: CreateDepartmentDto.DeptName,
        business: user,
      });

      return {
        statusCode: 200,
        message: 'Department Account created succesfully',
        data: saveinfo,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getDepartments(user: User): Promise<ApiResponse<Department[]>> {
    try {
      const departments = await this.departmentRepository.find({
        where: { business: { id: user.id } },
      });
      return {
        statusCode: 200,
        message: 'success',
        data: departments,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getDeptById(id: string): Promise<any> {
    try {
      const getDept = await this.departmentRepository.findOne({
        where: { id: id },
      });
      return getDept;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
