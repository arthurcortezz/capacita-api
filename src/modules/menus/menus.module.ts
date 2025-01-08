import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActionEntity } from '../actions/entities/action.entity';
import { ActionMenuEntity } from '../actions/entities/action-menu.entity';
import { MenuEntity } from './entities/menu.entity';
import { PrivilegeEntity } from './entities/privilege.entity';

import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { MenusResolver } from './menus.resolver';
import { MenuIdExistPipe } from './validate/menu-id-exist.pipe';
import { MenuNameAlreadyExistConstraint } from './validate/menu-name-already-exist.constraint';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActionEntity,
      ActionMenuEntity,
      MenuEntity,
      PrivilegeEntity,
    ]),
  ],
  controllers: [MenusController],
  providers: [
    MenusService,
    MenuIdExistPipe,
    MenuNameAlreadyExistConstraint,
    MenusResolver,
  ],
  exports: [MenusService],
})
export class MenusModule {}
