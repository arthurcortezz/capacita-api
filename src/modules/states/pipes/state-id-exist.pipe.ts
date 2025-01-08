import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateEntity } from '../entities/state.entity';

@Injectable()
export class StateIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(StateEntity)
    private readonly repository: Repository<StateEntity>,
  ) {}

  async transform(id: number): Promise<number> {
    const state = await this.repository.findOne({
      where: { id },
    });

    if (!state) {
      throw new NotFoundException('Estado não encontrado', `Não foi possível encontrar um Estado com esse ID: ${id}`);
    }

    return id;
  }
}
