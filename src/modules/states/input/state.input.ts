import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType('StateFiltersInput')
export class StateFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;
}
