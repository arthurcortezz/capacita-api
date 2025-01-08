import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionEntity } from '../entities/action.entity';

@Injectable()
export class ActionIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(ActionEntity)
    private readonly actionRepository: Repository<ActionEntity>,
  ) {}

  async transform(id: number) {
    const action = await this.actionRepository.findOne({ where: { id } });

    if (!action) {
      throw new NotFoundException(
        'Ação não encontrada',
        `Não foi possível encontrar uma ação com esse ID: ${id}`,
      );
    }

    return id;
  }
}
