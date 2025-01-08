import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Get,
  UseInterceptors,
  Put,
  Body,
} from '@nestjs/common';

import { JWTAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { Roles } from '../../shared/decorators/role.decorator';

import { TermServiceDto } from './dtos/term-service.dto';
import { TermServiceInterface } from './interfaces/term-service.interface';
import { TermsServiceService } from './terms-service.service';
import { HasAgreedTermServiceInterceptor } from '../../shared/interceptors/has-agreed-term-service.interceptor';

@ApiTags('Termos de serviço')
@Controller('terms-service')
@UseGuards(JWTAuthGuard)
export class TermsServiceController {
  constructor(private service: TermsServiceService) {}

  @Get()
  @Roles('TERMS-SERVICE_LISTAR')
  @UseInterceptors(HasAgreedTermServiceInterceptor)
  async find(): Promise<TermServiceInterface> {
    return this.service.find();
  }

  @Put()
  @Roles('TERMS-SERVICE_LISTAR')
  @UseInterceptors(HasAgreedTermServiceInterceptor)
  async save(@Body() data: TermServiceDto): Promise<{
    message: string;
    termService: TermServiceInterface;
  }> {
    return this.service.save(data);
  }
}
