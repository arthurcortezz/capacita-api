import { Module } from '@nestjs/common';
import { ParametersController } from './parameters.controller';
import { ParametersService } from './parameters.service';
import { ParametersResolver } from './parameters.resolver';
import { ParameterEntity } from './entities/parameter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParameterDescriptionAlreadyExist } from './validate/description-already-exist.constraint';

@Module({
  imports: [TypeOrmModule.forFeature([ParameterEntity])],
  controllers: [ParametersController],
  providers: [
    ParametersService,
    ParametersResolver,
    ParameterDescriptionAlreadyExist,
  ],
})
export class ParametersModule {}
