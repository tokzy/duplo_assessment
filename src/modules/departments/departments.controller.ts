import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@ApiTags('departments')
@ApiBearerAuth('jwt')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post('account/create')
  async CreateAccount(
    @Body() CreateDepartmentDto: CreateDepartmentDto,
    @Request() req: any,
  ) {
    return await this.departmentsService.createDeptAccounts(
      CreateDepartmentDto,
      req.user,
    );
  }

  @Get('lists')
  async getDepartments(@Request() req: any) {
    return await this.departmentsService.getDepartments(req.user);
  }
}
