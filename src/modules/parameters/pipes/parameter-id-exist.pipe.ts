import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParameterEntity } from '../entities/parameter.entity';

@Injectable()
export class ParameterIdExistPipe implements PipeTransform {
  constructor(
    @InjectRepository(ParameterEntity)
    private parametersRepository: Repository<ParameterEntity>,
  ) {}

  async transform(id: number): Promise<number> {
    const parameter = await this.parametersRepository.findOne({
      where: { id },
    });

    if (!parameter) {
      throw new NotFoundException(
        'Parâmetro de sistema não encontrado',
        `Não foi possível encontrar um parâmetro de sistema com esse ID: ${id}`,
      );
    }

    return id;
  }
}
