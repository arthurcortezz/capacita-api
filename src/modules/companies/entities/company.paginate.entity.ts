import { Field, ObjectType } from '@nestjs/graphql';
import { CompanyEntity } from './company.entity';

@ObjectType()
export class CompanyPaginateEntity {
  @Field(() => [CompanyEntity])
  rows: CompanyEntity[];

  @Field()
  count: number;
}
