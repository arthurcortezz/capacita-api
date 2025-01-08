import * as bcrypt from "bcryptjs";
import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Field, ObjectType } from "@nestjs/graphql";
import { UserAddressEntity } from "./user-address.entity";
import { RoleEntity } from "../../roles/entities/role.entity";
import { CompanyEntity } from "../../companies/entities/company.entity";

@Entity({ name: "users" })
@ObjectType()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id?: number;

  @Column()
  @Field({ nullable: true })
  name: string;

  @Column({ name: "email", unique: true })
  @Field({ nullable: true })
  email: string;

  @Column({ name: "person_type" })
  @Field({ nullable: true })
  personType: string;

  @Column({ name: "identification_number", unique: true })
  @Field({ nullable: true })
  identificationNumber: string;

  @Column()
  @Field({ nullable: true })
  phone: string;

  @Column()
  @Field({ nullable: true })
  plan: string;

  @Column({ select: false })
  @Field({ nullable: true })
  password: string;

  @Column({ name: "role_id" })
  @Field({ nullable: true })
  roleId: number;

  @OneToOne(() => RoleEntity)
  @JoinColumn({ name: "role_id" })
  @Field(() => RoleEntity, { nullable: true })
  role?: RoleEntity;

  @Column({ name: "company_id" })
  @Field({ nullable: true })
  companyId?: number;

  @OneToOne(() => CompanyEntity)
  @JoinColumn({ name: "company_id" })
  @Field(() => CompanyEntity, { nullable: true })
  company?: CompanyEntity;

  @Column({ name: "remember_token" })
  @Field()
  rememberToken: string;

  @Column({ name: "reset_password_at" })
  @Field()
  resetPasswordAt: Date;

  @Column({ name: "accepted_at" })
  @Field({ nullable: true })
  acceptedAt?: Date;

  @OneToOne(() => UserAddressEntity, (address) => address.user, {
    cascade: true,
  })
  @Field(() => UserAddressEntity, { nullable: true })
  address?: UserAddressEntity;

  @CreateDateColumn({ name: "created_at" })
  @Field()
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Field()
  updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  @Field()
  deletedAt?: Date;

  constructor(data: Partial<UserEntity> = {}) {
    Object.assign(this, data);
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    if (!/^\$2a\$\d+\$/.test(this.password)) {
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async updatePassword?(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async checkPassword(plainPassword: string): Promise<boolean> {
    return (await bcrypt.compare(plainPassword, this.password)) as boolean;
  }
}
