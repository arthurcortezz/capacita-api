import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType('ParameterFiltersInput')
export class ParameterFiltersInput {
  @IsOptional()
  @Field({ nullable: true })
  id?: number;

  @IsOptional()
  @Field({ nullable: true })
  key?: string;

  @IsOptional()
  @Field({ nullable: true })
  value?: string;

  @IsOptional()
  @Field({ nullable: true })
  description?: string;
}
