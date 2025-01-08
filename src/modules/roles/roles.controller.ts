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

import { RolesService } from './roles.service';
import { RoleCreateDto } from './dtos/role-create.dto';
import { RoleUpdateDto } from './dtos/role-update.dto';
import { RoleInterface } from './interfaces/role.interface';
import { Roles } from '../../shared/decorators/role.decorator';
import { RoleIdExistPipe } from './validate/role-id-exist.pipe';
import { JWTAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { FindRole } from '../../shared/docs/roles/find-role.docs';
import { RemoveRole } from '../../shared/docs/roles/remove-role.docs';
import { CreateRole } from '../../shared/docs/roles/create-role.docs';
import { UpdateRole } from '../../shared/docs/roles/update-role.docs';
import { FindAllRoles } from '../../shared/docs/roles/find-all-roles.docs';
import { HasAgreedTermServiceInterceptor } from '../../shared/interceptors/has-agreed-term-service.interceptor';

@ApiTags('Perfis de acesso')
@ApiBearerAuth()
@Controller('roles')
@UseGuards(JWTAuthGuard)
@UseInterceptors(HasAgreedTermServiceInterceptor)
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Get()
  @FindAllRoles()
  @Roles('ROLES_LISTAR')
  async getAll(): Promise<RoleInterface[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @FindRole()
  @Roles('ROLES_LISTAR')
  async findOne(
    @Param('id', ParseIntPipe, RoleIdExistPipe) id: number,
  ): Promise<RoleInterface> {
    return this.service.findOne(id);
  }

  @Post()
  @CreateRole()
  @Roles('ROLES_CRIAR')
  async create(
    @Body() data: RoleCreateDto,
  ): Promise<{ role: RoleInterface; message: string }> {
    return this.service.create(data);
  }

  @Put(':id')
  @UpdateRole()
  @Roles('ROLES_MODIFICAR')
  async update(
    @Param('id', ParseIntPipe, RoleIdExistPipe) id: number,
    @Body() data: RoleUpdateDto,
  ): Promise<{ role: RoleInterface; message: string }> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @RemoveRole()
  @Roles('ROLES_REMOVER')
  async delete(
    @Param('id', ParseIntPipe, RoleIdExistPipe) id: number,
  ): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
