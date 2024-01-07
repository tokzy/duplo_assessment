import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { User } from 'src/modules/user/entities/user.entity';
import { UserState } from 'src/modules/user/enums/user.enum';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserStatusGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const get = await this.userRepository.findOneBy({
      id: request.user.id,
    });
    if (get?.status === UserState.INACTIVE) {
      return false;
    }
    return true;
  }
}
