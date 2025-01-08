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
} from '@nestjs/common';

import { ActionsService } from './actions.service';
import { ActionCreateDto } from './dtos/action-create.dto';
import { ActionUpdateDto } from './dtos/action-update.dto';
import { Roles } from '../../shared/decorators/role.decorator';
import { ActionInterface } from './interfaces/action.interface';
import { JWTAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { ActionIdExistPipe } from './validate/action-id-exist.pipe';
import { FindAction } from '../../shared/docs/actions/find-action.docs';
import { EditAction } from '../../shared/docs/actions/update-action.docs';
import { CreateAction } from '../../shared/docs/actions/create-action.docs';
import { RemoveAction } from '../../shared/docs/actions/remove-action.docs';
import { FindAllActions } from '../../shared/docs/actions/find-all-actions.docs';
import { HasAgreedTermServiceInterceptor } from '../../shared/interceptors/has-agreed-term-service.interceptor';

@ApiBearerAuth()
@ApiTags('Ações')
@Controller('actions')
@UseGuards(JWTAuthGuard)
@UseInterceptors(HasAgreedTermServiceInterceptor)
export class ActionsController {
  constructor(private readonly service: ActionsService) {}

  @Get()
  @FindAllActions()
  @Roles('ACTIONS_LISTAR')
  async getAll(): Promise<ActionInterface[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @FindAction()
  @Roles('ACTIONS_LISTAR')
  async findOne(
    @Param('id', ParseIntPipe, ActionIdExistPipe) id: number,
  ): Promise<ActionInterface> {
    return this.service.findOne(id);
  }

  @Post()
  @CreateAction()
  @Roles('ACTIONS_CRIAR')
  async create(
    @Body() data: ActionCreateDto,
  ): Promise<{ action: ActionInterface; message: string }> {
    return this.service.create(data);
  }

  @Put(':id')
  @EditAction()
  @Roles('ACTIONS_MODIFICAR')
  async update(
    @Param('id', ParseIntPipe, ActionIdExistPipe) id: number,
    @Body() data: ActionUpdateDto,
  ): Promise<{ action: ActionInterface; message: string }> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @RemoveAction()
  @Roles('ACTIONS_REMOVER')
  async delete(
    @Param('id', ParseIntPipe, ActionIdExistPipe) id: number,
  ): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
