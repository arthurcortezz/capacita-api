import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CitiesController } from './cities.controller';
import { CitiesResolver } from './cities.resolver';
import { CitiesService } from './cities.service';
import { CityEntity } from './entities/city.entity';
import { CityIdExistPipe } from './pipes/city-id-exist.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [CitiesController],
  providers: [CitiesService, CitiesResolver, CityIdExistPipe],
})
export class CitiesModule {}
