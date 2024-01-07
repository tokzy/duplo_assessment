import { CustomBaseEntity } from '@app/common/entities/base.entity';
import { Order } from '@app/modules/orders/entities/order.entity';
import { User } from '@app/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Department extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  DeptName: string;

  @ManyToOne(() => User, (business) => business.departments)
  business: User;

  @OneToMany(() => Order, (orders) => orders.department)
  orders: Order[];
}
