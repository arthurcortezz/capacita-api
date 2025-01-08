import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.contoller';
import { DashboardService } from './dashboard.service';
import { UserEntity } from '../users/entities/user.entity';
import { CompanyEntity } from '../companies/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CompanyEntity])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
