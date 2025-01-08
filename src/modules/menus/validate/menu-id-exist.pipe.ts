import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from '../entities/menu.entity';

@Injectable()
export class MenuIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menusRepository: Repository<MenuEntity>,
  ) {}

  async transform(id: number) {
    const menus = await this.menusRepository.findOne({ where: { id } });

    if (!menus) {
      throw new NotFoundException(
        'Menu não encontrado',
        `Não foi possível encontrar um menu com esse ID: ${id}`,
      );
    }

    return id;
  }
}
