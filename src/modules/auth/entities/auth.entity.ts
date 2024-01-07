import { CustomBaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Auth extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 300 })
  password: string;

  @OneToOne(() => User, (user) => user.auth)
  @JoinColumn()
  user: User;
}
