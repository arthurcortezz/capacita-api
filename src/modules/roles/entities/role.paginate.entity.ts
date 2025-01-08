import { Field, ObjectType } from '@nestjs/graphql';
import { RoleEntity } from './role.entity';

@ObjectType()
export class RolePaginateEntity {
  @Field(() => [RoleEntity])
  rows: RoleEntity[];

  @Field()
  count: number;
}
