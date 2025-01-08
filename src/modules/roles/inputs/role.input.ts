import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType('RoleFiltersInput')
export class RoleFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;
}
