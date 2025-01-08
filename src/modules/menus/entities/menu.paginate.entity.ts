import { Field, ObjectType } from '@nestjs/graphql';
import { MenuEntity } from './menu.entity';

@ObjectType()
export class MenuPaginateEntity {
  @Field(() => [MenuEntity])
  rows: MenuEntity[];

  @Field()
  count: number;
}
