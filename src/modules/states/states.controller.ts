import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { StatesService } from './states.service';
import { StateInterface } from './interfaces/state.interface';
import { StateIdExistPipe } from './pipes/state-id-exist.pipe';
import { FindState } from '../../shared/docs/states/find-state.docs';
import { FindAllStates } from '../../shared/docs/states/find-all-states.docs';

@ApiTags('Estados')
@Controller('states')
export class StatesController {
  constructor(private service: StatesService) {}

  @Get()
  @FindAllStates()
  async findAll(): Promise<StateInterface[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @FindState()
  async findOne(
    @Param('id', ParseIntPipe, StateIdExistPipe) id: number,
  ): Promise<StateInterface> {
    return await this.service.findOne(id);
  }
}
