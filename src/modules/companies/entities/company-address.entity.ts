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
import { CompanyEntity } from './company.entity';
import { CityEntity } from '../../cities/entities/city.entity';

@Entity({ name: 'companies_address' })
@ObjectType()
export class CompanyAddressEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ name: 'street' })
  @Field({ nullable: true })
  street: string;

  @Column({ name: 'number' })
  @Field({ nullable: true })
  number: string;

  @Column({ name: 'complement' })
  @Field({ nullable: true })
  complement: string;

  @Column({ name: 'neighborhood' })
  @Field({ nullable: true })
  neighborhood: string;

  @Column({ name: 'cep' })
  @Field({ nullable: true })
  cep: string;

  @Column({ name: 'city_id' })
  @Field({ nullable: true })
  cityId: number;

  @OneToOne(() => CityEntity, (city) => city.companyAddress)
  @JoinColumn({ name: 'city_id' })
  city?: CityEntity;

  @Column({ name: 'company_id' })
  @Field({ nullable: true })
  companyId: number;

  @OneToOne(() => CompanyEntity, (company) => company.address)
  @JoinColumn({ name: 'company_id' })
  company?: CompanyEntity;

  @CreateDateColumn({ name: 'created_at' })
  @Field()
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field()
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Field()
  deletedAt?: Date;
}
