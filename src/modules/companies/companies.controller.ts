import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Controller,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';

import { CompaniesService } from './companies.service';
import { CompanyUpdateDto } from './dtos/company-update.dto';
import { CompanyCreateDto } from './dtos/company-create.dto';
import { Roles } from '../../shared/decorators/role.decorator';
import { CompanyInterface } from './interfaces/company.interface';
import { AuthUser } from '../../shared/decorators/user.decorator';
import { JWTAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { CompanyIdExistPipe } from './pipes/company-id-exist.pipe';
import { UserJwtInterface } from '../authentication/interfaces/user-jwt.interface';
import { HasAgreedTermServiceInterceptor } from '../../shared/interceptors/has-agreed-term-service.interceptor';
import { FindAllCompanies } from 'src/shared/docs/companies/find-all-companies.docs';
import { FindCompany } from 'src/shared/docs/companies/find-company.docs';
import { CreateCompany } from 'src/shared/docs/companies/create-company.docs';
import { UpdateCompany } from 'src/shared/docs/companies/update-company.docs';
import { RemoveCompany } from 'src/shared/docs/companies/remove-company.docs';

@ApiTags('Empresas')
@Controller('companies')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@UseInterceptors(HasAgreedTermServiceInterceptor)
export class CompaniesController {
  constructor(private readonly service: CompaniesService) {}

  @Get()
  @FindAllCompanies()
  @Roles('COMPANIES_LISTAR')
  async getAll(
    @AuthUser() currentUser: UserJwtInterface,
  ): Promise<CompanyInterface[]> {
    return this.service.findAll(currentUser);
  }

  @Get(':id')
  @FindCompany()
  @Roles('COMPANIES_LISTAR')
  async findOne(
    @Param('id', ParseIntPipe, CompanyIdExistPipe) id: number,
    @AuthUser() currentUser: UserJwtInterface,
  ): Promise<CompanyInterface> {
    return this.service.findOne(id, currentUser);
  }

  @Post()
  @CreateCompany()
  @Roles('COMPANIES_CRIAR')
  async create(
    @Body() data: CompanyCreateDto,
  ): Promise<{ company: CompanyInterface; message: string }> {
    return this.service.create(data);
  }

  @Put(':id')
  @UpdateCompany()
  @Roles('COMPANIES_MODIFICAR')
  async update(
    @Param('id', ParseIntPipe, CompanyIdExistPipe) id: number,
    @Body() data: CompanyUpdateDto,
    @AuthUser() currentUser: UserJwtInterface,
  ): Promise<{ company: CompanyInterface; message: string }> {
    return this.service.update(id, data, currentUser);
  }

  @Delete(':id')
  @RemoveCompany()
  @Roles('COMPANIES_REMOVER')
  async delete(
    @Param('id', ParseIntPipe, CompanyIdExistPipe) id: number,
    @AuthUser() currentUser: UserJwtInterface,
  ): Promise<{ message: string }> {
    return this.service.delete(id, currentUser);
  }
}
