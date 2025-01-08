import { Field, ObjectType } from '@nestjs/graphql';
import { ActionEntity } from './action.entity';

@ObjectType()
export class ActionPaginateEntity {
  @Field(() => [ActionEntity])
  rows: ActionEntity[];

  @Field()
  count: number;
}
