import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType('MenuFiltersInput')
export class MenuFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  route?: string;

  @Field({ nullable: true })
  @IsOptional()
  icon?: string;

  @Field({ nullable: true })
  @IsOptional()
  menuKey?: string;
}
