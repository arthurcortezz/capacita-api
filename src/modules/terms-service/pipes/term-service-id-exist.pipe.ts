import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TermServiceEntity } from '../entities/term-service.entity';

@Injectable()
export class TermServiceIdExistPipe implements PipeTransform {
  constructor(
    @InjectRepository(TermServiceEntity)
    private repository: Repository<TermServiceEntity>,
  ) {}

  async transform(id: number): Promise<number> {
    const term = await this.repository.findOne({ where: { id } });

    if (!term) {
      throw new NotFoundException(
        'Termo de serviço não encontrado',
        `Não foi possível encontrar um termo de serviço com esse ID: ${id}`,
      );
    }

    return id;
  }
}
