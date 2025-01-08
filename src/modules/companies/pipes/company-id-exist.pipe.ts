import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyIdExistPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async transform(id: number) {
    const user = await this.companyRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(
        'Empresa não encontrada',
        `Não foi possível encontrar uma empresa com esse ID: ${id}`,
      );
    }

    return id;
  }
}
