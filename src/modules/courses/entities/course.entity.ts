import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity({ name: "courses" })
@ObjectType()
export class CourseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id?: number;

  @Column()
  @Field({ nullable: true })
  name: string;

  @Column()
  @Field({ nullable: true })
  description: string;

  @CreateDateColumn({ name: "created_at" })
  @Field()
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @Field()
  updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  @Field()
  deletedAt?: Date;
}
