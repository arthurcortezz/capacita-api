import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TermServiceEntity } from './entities/term-service.entity';
import { TermServiceInterface } from './interfaces/term-service.interface';
import { TermServiceDto } from './dtos/term-service.dto';

@Injectable()
export class TermsServiceService {
  constructor(
    @InjectRepository(TermServiceEntity)
    private readonly repository: Repository<TermServiceEntity>,
  ) {}

  async find(): Promise<TermServiceInterface> {
    try {
      const term = await this.repository.find({
        order: { id: 'DESC' },
        take: 1,
      });

      return term.length > 0 ? term.shift() : null;
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível encontrar os termos de serviço.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async save(data: TermServiceDto): Promise<{
    message: string;
    termService: TermServiceInterface;
  }> {
    try {
      let termService = await this.repository.find({
        order: { id: 'DESC' },
        take: 1,
      });

      if (termService) {
        await this.repository.update(termService.shift().id, data);
      } else {
        const entity = Object.assign(new TermServiceEntity(), data);
        await this.repository.save(entity);
      }

      termService = await this.repository.find({
        order: { id: 'DESC' },
        take: 1,
      });

      return {
        message: 'O termo de serviço foi modificado com sucesso.',
        termService: termService.shift(),
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Não foi possível modificar os termos de serviço.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
