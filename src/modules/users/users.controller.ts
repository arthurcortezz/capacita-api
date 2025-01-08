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

import { UsersService } from './users.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserInterface } from './interfaces/user.interface';
import { Roles } from '../../shared/decorators/role.decorator';
import { UserIdExistPipe } from './validate/user-id-exist.pipe';
import { JWTAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { AuthUser } from '../../shared/decorators/user.decorator';
import { FindUser } from '../../shared/docs/users/find-user.docs';
import { CreateUser } from '../../shared/docs/users/create-user.docs';
import { UpdateUser } from '../../shared/docs/users/update-user.docs';
import { RemoveUser } from '../../shared/docs/users/remove-user.docs';
import { FindAllUsers } from '../../shared/docs/users/find-all-users.docs';
import { UserJwtInterface } from '../authentication/interfaces/user-jwt.interface';
import { FindAllConsultants } from '../../shared/docs/users/find-all-consultants.docs';
import { HasAgreedTermServiceInterceptor } from '../../shared/interceptors/has-agreed-term-service.interceptor';

@ApiTags('Usuários')
@Controller('users')
@UseGuards(JWTAuthGuard)
@ApiBearerAuth()
@UseInterceptors(HasAgreedTermServiceInterceptor)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @FindAllUsers()
  @Roles('USERS_LISTAR')
  async findAll(
    @AuthUser() currentUser: UserJwtInterface,
  ): Promise<UserInterface[]> {
    return this.service.findAll(currentUser);
  }

  @Get('consultants')
  @FindAllConsultants()
  @Roles('CONSULTANTS_LISTAR')
  async findAllConsultants(
    @AuthUser() currentUser: UserJwtInterface,
  ): Promise<UserInterface[]> {
    return this.service.findAllConsultants(currentUser);
  }

  @Get(':id')
  @FindUser()
  @Roles(['USERS_LISTAR', 'CONSULTANTS_LISTAR'])
  async findOne(
    @Param('id', ParseIntPipe, UserIdExistPipe) id: number,
    @AuthUser() currentUser: UserJwtInterface,
  ): Promise<UserInterface> {
    return this.service.findOne(id, currentUser);
  }

  @Post()
  @CreateUser()
  @Roles(['USERS_CRIAR', 'CONSULTANTS_CRIAR'])
  async create(
    @Body() data: UserCreateDto,
    @AuthUser() currentUser: UserJwtInterface,
  ): Promise<{ user: UserInterface; message: string }> {
    return await this.service.create(data, currentUser);
  }

  @Put(':id')
  @UpdateUser()
  @Roles('USERS_MODIFICAR')
  async update(
    @Param('id', ParseIntPipe, UserIdExistPipe) id: number,
    @Body() data: UserUpdateDto,
    @AuthUser() currentUser: UserJwtInterface,
  ): Promise<{ user: UserInterface; message: string }> {
    return this.service.update(id, data, currentUser);
  }

  @Delete(':id')
  @RemoveUser()
  @Roles('USERS_REMOVER')
  async delete(
    @Param('id', ParseIntPipe, UserIdExistPipe) id: number,
    @AuthUser() currentUser: UserJwtInterface,
  ): Promise<{ message: string }> {
    return this.service.delete(id, currentUser);
  }
}
