import { Field, ObjectType } from '@nestjs/graphql';
import { ParameterEntity } from './parameter.entity';

@ObjectType()
export class ParameterPaginateEntity {
  @Field(() => [ParameterEntity])
  rows: ParameterEntity[];

  @Field()
  count: number;
}
