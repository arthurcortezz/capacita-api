import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleNameAlreadyExistConstraint } from './validate/role-name-already-exist.constraint';
import { RoleIdExistPipe } from './validate/role-id-exist.pipe';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { RolesController } from './roles.controller';
import { RoleEntity } from './entities/role.entity';
import { RoleIdExistConstraint } from './validate/role-id-exist.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RolesController],
  providers: [
    RolesService,
    RolesResolver,
    RoleIdExistPipe,
    RoleIdExistConstraint,
    RoleNameAlreadyExistConstraint,
  ],
})
export class RolesModule {}
