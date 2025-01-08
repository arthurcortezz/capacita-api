import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  UseGuards,
  Controller,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { MenusService } from './menus.service';
import { MenuCreateDto } from './dtos/menu-create.dto';
import { MenuUpdateDto } from './dtos/menu-update.dto';
import { MenuInterface } from './interfaces/menu.interface';
import { Roles } from '../../shared/decorators/role.decorator';
import { MenuIdExistPipe } from './validate/menu-id-exist.pipe';
import { JWTAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { FindMenu } from '../../shared/docs/menus/find-menu.docs ';
import { CreateMenu } from '../../shared/docs/menus/create-menu.docs';
import { UpdateMenu } from '../../shared/docs/menus/update-menu.docs';
import { DeleteMenu } from '../../shared/docs/menus/delete-menu.docs';
import { FindAllMenus } from '../../shared/docs/menus/find-all-menus.docs';
import { HasAgreedTermServiceInterceptor } from '../../shared/interceptors/has-agreed-term-service.interceptor';

@ApiTags('Menus')
@ApiBearerAuth()
@Controller('menus')
@UseGuards(JWTAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HasAgreedTermServiceInterceptor)
export class MenusController {
  constructor(private readonly service: MenusService) {}

  @Get()
  @FindAllMenus()
  @Roles('MENUS_LISTAR')
  async findAll(): Promise<MenuInterface[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @FindMenu()
  @Roles('MENUS_LISTAR')
  async findOne(
    @Param('id', ParseIntPipe, MenuIdExistPipe) id: number,
  ): Promise<MenuInterface> {
    return this.service.findOne(id);
  }

  @Post()
  @CreateMenu()
  @Roles('MENUS_CRIAR')
  async create(
    @Body() data: MenuCreateDto,
  ): Promise<{ menu: MenuInterface; message: string }> {
    return this.service.create(data);
  }

  @Put(':id')
  @UpdateMenu()
  @Roles('MENUS_MODIFICAR')
  async update(
    @Param('id', ParseIntPipe, MenuIdExistPipe) id: number,
    @Body() data: MenuUpdateDto,
  ): Promise<{ menu: MenuInterface; message: string }> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @DeleteMenu()
  @Roles('MENUS_REMOVER')
  async delete(
    @Param('id', ParseIntPipe, MenuIdExistPipe) id: number,
  ): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
