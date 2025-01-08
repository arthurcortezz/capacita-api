import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { CompanyFiltersInput } from '../../companies/inputs/company.input';
import { RoleFiltersInput } from '../../roles/inputs/role.input';

@InputType('UserFiltersInput')
export class UserFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  roleId?: number;

  @Field({ nullable: true })
  @IsOptional()
  companyId?: number;

  @Field(() => CompanyFiltersInput, { nullable: true })
  @IsOptional()
  company?: CompanyFiltersInput;

  @Field(() => RoleFiltersInput, { nullable: true })
  @IsOptional()
  role?: RoleFiltersInput;
}
