import { v4 as uuidv4 } from "uuid";
import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { UserEntity } from "../../users/entities/user.entity";
import { CompanyAddressEntity } from "./company-address.entity";

@Entity({ name: "companies" })
@ObjectType()
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ name: "uuid" })
  @Field({ nullable: true })
  uuid: string;

  @Column()
  @Field({ nullable: true })
  name: string;

  @Column({ name: "social_reason" })
  @Field({ nullable: true })
  socialReason: string;

  @Column()
  @Field({ nullable: true })
  cnpj: string;

  @Column()
  @Field({ nullable: true })
  phone: string;

  @Column()
  @Field({ nullable: true })
  email: string;

  @OneToOne(
    () => CompanyAddressEntity,
    (address) => address.company,
    {
      cascade: true,
    }
  )
  @Field(() => CompanyAddressEntity, { nullable: true })
  address?: CompanyAddressEntity;

  @OneToMany(() => UserEntity, (user) => user.company)
  @JoinColumn({ name: "company_id" })
  @Field(() => [UserEntity], { nullable: true })
  users?: UserEntity[];

  @CreateDateColumn({ name: "created_at" })
  @Field()
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Field()
  updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  @Field()
  deletedAt?: Date;

  @BeforeInsert()
  async beforeInsert(): Promise<void> {
    this.uuid = uuidv4();
  }
}
