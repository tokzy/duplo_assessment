import { CustomBaseEntity } from '@app/common/entities/base.entity';
import { Department } from '@app/modules/departments/entities/department.entity';
import { User } from '@app/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { paymentStatus } from '../dto/create-order.dto';

@Entity()
export class Order extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: true })
  itemName: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  platform_code: string;

  @Column({
    type: 'numeric',
    precision: 13,
    scale: 2,
    default: 0.0,
    nullable: true,
  })
  amount: number;

  @Column({ type: 'enum', enum: paymentStatus, default: paymentStatus.UNPAID })
  status: paymentStatus;

  @ManyToOne(() => User, (business) => business.orders)
  business: User;

  @ManyToOne(() => Department, (department) => department.orders)
  department: Department;
}
