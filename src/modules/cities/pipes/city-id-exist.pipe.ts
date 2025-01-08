import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../entities/city.entity';

@Injectable()
export class CityIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(CityEntity)
    private readonly repository: Repository<CityEntity>,
  ) {}

  async transform(id: number): Promise<number> {
    const city = await this.repository.findOne({
      where: { id },
    });

    if (!city) {
      throw new NotFoundException('Cidade não encontrada', `Não foi possível encontrar uma Cidade com esse ID: ${id}`);
    }

    return id;
  }
}
