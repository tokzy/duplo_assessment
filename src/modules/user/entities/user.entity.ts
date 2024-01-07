import { UserRole } from '@app/modules/auth/enums/auth.enum';
import { Department } from '@app/modules/departments/entities/department.entity';
import { Order } from '@app/modules/orders/entities/order.entity';
import { CustomBaseEntity } from 'src/common/entities/base.entity';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
import { UserState } from '../enums/user.enum';

@Entity()
export class User extends CustomBaseEntity {
  @Index('email_index_auth')
  @Column({ type: 'varchar', length: 300, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  businessName?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  state?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  country?: string;

  @Index('user_account_status_ind')
  @Column({ type: 'enum', enum: UserState, default: UserState.ACTIVE })
  status?: UserState;

  @Index('phone_number_in')
  @Column({ type: 'varchar', length: 300, unique: true, nullable: true })
  phoneNumber?: string;

  @Column('text', { array: true, default: [UserRole.COMPANY] })
  roles: string[];

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;

  @OneToMany(() => Department, (departments) => departments.business)
  departments: Department[];

  @OneToMany(() => Order, (orders) => orders.business)
  orders: Order[];
}
