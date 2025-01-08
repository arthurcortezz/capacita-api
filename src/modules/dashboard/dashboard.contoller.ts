import { Controller, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JWTAuthGuard } from '../../shared/guards/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JWTAuthGuard)
export class DashboardController {
  constructor(private service: DashboardService) {}
}
