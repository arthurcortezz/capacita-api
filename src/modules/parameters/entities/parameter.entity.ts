import { Field, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransformConstParamByName } from '../../../shared/utils/transform-param-const-by-name.util';

@ObjectType()
@Entity({ name: 'parameters' })
export class ParameterEntity {
  @PrimaryGeneratedColumn()
  @Field({ nullable: true })
  id: number;

  @Column()
  @Field({ nullable: true })
  key: string;

  @Column()
  @Field({ nullable: true })
  value: string;

  @Column()
  @Field({ nullable: true })
  description?: string;

  @CreateDateColumn({ name: 'created_at' })
  @Field({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Field({ nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Field({ nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async transformKey(): Promise<void> {
    if (this.key) {
      this.key = TransformConstParamByName(this.key);
    }
  }
}
