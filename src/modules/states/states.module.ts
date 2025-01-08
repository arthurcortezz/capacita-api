import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatesController } from './states.controller';
import { StatesResolver } from './states.resolver';
import { StatesService } from './states.service';
import { StateIdExistPipe } from './pipes/state-id-exist.pipe';
import { StateEntity } from './entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity])],
  controllers: [StatesController],
  providers: [StatesService, StatesResolver, StateIdExistPipe],
})
export class StatesModule {}
