import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCompanies1679220847311 implements MigrationInterface {
  private table = new Table({
    name: 'companies',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'uuid',
        type: 'text',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'social_reason',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'cnpj',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'email',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'phone',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
