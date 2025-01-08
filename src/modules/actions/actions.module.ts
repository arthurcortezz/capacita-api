import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActionEntity } from './entities/action.entity';
import { ActionNameAlreadyExistConstraint } from './validate/action-name-already-exist.constraint';
import { ActionIdExistPipe } from './validate/action-id-exist.pipe';
import { ActionsService } from './actions.service';
import { ActionsResolver } from './actions.resolver';
import { ActionsController } from './actions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActionEntity])],
  controllers: [ActionsController],
  providers: [
    ActionsService,
    ActionsResolver,
    ActionIdExistPipe,
    ActionNameAlreadyExistConstraint,
  ],
})
export class ActionsModule {}
