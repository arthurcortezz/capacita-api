import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType('CityFiltersInput')
export class CityFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  stateId?: number;
}
