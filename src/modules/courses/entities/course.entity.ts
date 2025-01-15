import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { LessonEntity } from "../../lessons/entities/lesson.entity";

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

  @Column("decimal", { precision: 10, scale: 2 }) // Valor monetário
  @Field()
  value: number;

  @Column()
  @Field({ nullable: true })
  duration: string;

  @OneToMany(() => LessonEntity, (lesson) => lesson.course)
  @Field(() => [LessonEntity], { nullable: true })
  lessons?: LessonEntity[];

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
