import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { StateEntity } from '../../states/entities/state.entity';
import { UserAddressEntity } from '../../users/entities/user-address.entity';
import { CompanyAddressEntity } from '../../companies/entities/company-address.entity';

@ObjectType()
@Entity({ name: 'cities' })
export class CityEntity {
  @PrimaryGeneratedColumn()
  @Field({ nullable: true })
  id: number;

  @Column()
  @Field({ nullable: true })
  name: string;

  @Column({ name: 'state_id' })
  @Field({ nullable: true })
  stateId: number;

  @OneToOne(() => StateEntity)
  @JoinColumn({ name: 'state_id' })
  @Field({ nullable: true })
  state: StateEntity;

  @OneToOne(() => UserAddressEntity, (user) => user.city)
  @Field(() => UserAddressEntity, { nullable: true })
  userAddress?: UserAddressEntity;

  @OneToOne(() => CompanyAddressEntity, (company) => company.city)
  @Field(() => CompanyAddressEntity, { nullable: true })
  companyAddress?: CompanyAddressEntity;

  @CreateDateColumn({ name: 'created_at' })
  @Field({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field({ nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Field({ nullable: true })
  deletedAt?: Date;
}
