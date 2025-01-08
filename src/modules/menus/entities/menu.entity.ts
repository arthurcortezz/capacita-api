import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { ActionMenuEntity } from '../../actions/entities/action-menu.entity';

@Entity({ name: 'menus' })
@ObjectType()
export class MenuEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id?: number;

  @Column()
  @Field({ nullable: true })
  name: string;

  @Column()
  @Field({ nullable: true })
  route: string;

  @Column({ name: 'menu_key' })
  @Field({ nullable: true })
  menuKey: string;

  @Column()
  @Field({ nullable: true })
  icon: string;

  @OneToMany(() => ActionMenuEntity, (actionsMenu) => actionsMenu.menu, {
    cascade: true,
  })
  @JoinColumn({ name: 'action_id' })
  @Field(() => [ActionMenuEntity], { nullable: true })
  actionsMenus: ActionMenuEntity[];

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
