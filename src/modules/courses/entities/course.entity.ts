import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @Column()
  @Field({ nullable: true })
  image: string;

  @Column()
  @Field({ nullable: true })
  status: string;

  @Column()
  @Field({ nullable: true })
  value: string;

  @Column()
  @Field({ nullable: true })
  duration: string;

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
