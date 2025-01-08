import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TermServiceEntity } from './entities/term-service.entity';
import { TermsServiceController } from './terms-service.controller';
import { TermsServiceService } from './terms-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([TermServiceEntity])],
  controllers: [TermsServiceController],
  providers: [TermsServiceService],
  exports: [TermsServiceService],
})
export class TermsServiceModule {}
