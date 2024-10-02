import { User } from '../../users/entities/user.entity';
import { Animal } from '../../animals/entities/animal.entity';
import { Company } from '../../companies/entities/company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Field {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  owner: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'companyId', referencedColumnName: 'id' })
  company: Company;

  @Column({ type: 'uuid' })
  companyId: string;

  @OneToMany(() => User, (user) => user.field)
  users: User[];

  @OneToMany(() => Animal, (animal) => animal.field)
  animals: Animal[];
}
