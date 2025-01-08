import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { emailMicroserviceConfig } from '../../config/rabbitmq/rabbitmq.config';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserIdExistPipe } from './validate/user-id-exist.pipe';
import { UserEntity } from './entities/user.entity';
import { UserIdentificationNumberAlreadyExistConstraint } from './validate/user-identification-number-already-exist.constraint';
import { UserEmailAlreadyExistConstraint } from './validate/user-email-already-exist.constraint';
import { CompanyEntity } from '../companies/entities/company.entity';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.register([emailMicroserviceConfig]),
    TypeOrmModule.forFeature([UserEntity, CompanyEntity]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersResolver,
    UserIdExistPipe,
    UserIdentificationNumberAlreadyExistConstraint,
    UserEmailAlreadyExistConstraint,
  ],
})
export class UsersModule {}
