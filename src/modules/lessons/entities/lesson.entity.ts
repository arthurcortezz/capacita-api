import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';

import { CourseEntity } from '../../courses/entities/course.entity';

@Entity('lessons')
@ObjectType()
export class LessonEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  order: number;

  @Column()
  @Field()
  title: string;

  @Column({ nullable: false })
  @Field({ name: 'pdf_url' })
  pdfUrl: string;

  @Column({ name: 'course_id' })
  @Field({ nullable: true })
  courseId: number;

  @ManyToOne(() => CourseEntity, (course) => course.lessons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' }) // Definindo explicitamente o nome da coluna
  @Field(() => CourseEntity, { nullable: false })
  course: CourseEntity;

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
