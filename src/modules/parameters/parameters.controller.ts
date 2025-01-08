import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Put,
  Get,
  Body,
  Post,
  Param,
  Delete,
  UseGuards,
  Controller,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';

import { ParametersService } from './parameters.service';
import { Roles } from '../../shared/decorators/role.decorator';
import { ParameterCreateDto } from './dtos/parameter-create.dto';
import { ParameterUpdateDto } from './dtos/parameter-update.dto';
import { JWTAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { ParameterInterface } from './interfaces/parameter.interface';
import { ParameterIdExistPipe } from './pipes/parameter-id-exist.pipe';
import { FindParameter } from '../../shared/docs/parameters/find-parameter.docs';
import { EditParameter } from '../../shared/docs/parameters/edit-parameter.docs';
import { ParameterFilterInterface } from './interfaces/parameter-filter.interface';
import { CreateParameter } from '../../shared/docs/parameters/create-parameter.docs';
import { DeleteParameter } from '../../shared/docs/parameters/delete-parameter.docs';
import { FindAllParameters } from '../../shared/docs/parameters/find-all-parameters.docs';
import { HasAgreedTermServiceInterceptor } from '../../shared/interceptors/has-agreed-term-service.interceptor';

@ApiTags('Parâmetros do sistema')
@ApiBearerAuth()
@Controller('parameters')
@UseGuards(JWTAuthGuard)
@UseInterceptors(HasAgreedTermServiceInterceptor)
export class ParametersController {
  constructor(private service: ParametersService) {}

  @Get()
  @FindAllParameters()
  @Roles('PARAMETERS_LISTAR')
  async findAll(
    filter: ParameterFilterInterface,
  ): Promise<ParameterInterface[]> {
    return this.service.findAll(filter);
  }

  @Get(':id')
  @FindParameter()
  @Roles('PARAMETERS_LISTAR')
  async findOne(
    @Param('id', ParseIntPipe, ParameterIdExistPipe) id: number,
  ): Promise<ParameterInterface> {
    return this.service.findOne(id);
  }

  @Post()
  @CreateParameter()
  @Roles('PARAMETERS_CRIAR')
  async create(
    @Body() data: ParameterCreateDto,
  ): Promise<{ parameter: ParameterInterface; message: string }> {
    return this.service.create(data);
  }

  @Put(':id')
  @EditParameter()
  @Roles('PARAMETERS_MODIFICAR')
  async update(
    @Body() data: ParameterUpdateDto,
    @Param('id', ParseIntPipe, ParameterIdExistPipe) id: number,
  ): Promise<{ parameter: ParameterInterface; message: string }> {
    return this.service.update(data, id);
  }

  @Delete(':id')
  @DeleteParameter()
  @Roles('PARAMETERS_REMOVER')
  async delete(
    @Param('id', ParseIntPipe, ParameterIdExistPipe) id: number,
  ): Promise<{ message: string }> {
    return await this.service.delete(id);
  }
}
