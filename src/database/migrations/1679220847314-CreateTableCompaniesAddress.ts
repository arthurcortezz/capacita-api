import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableCompaniesAddress1679220847314
  implements MigrationInterface
{
  private table = new Table({
    name: 'companies_address',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'street',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'number',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'complement',
        type: 'TEXT',
        isNullable: true,
      },
      {
        name: 'neighborhood',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'cep',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'city_id',
        type: 'int',
      },
      {
        name: 'company_id',
        type: 'int',
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

  private cityForeignKey = new TableForeignKey({
    columnNames: ['city_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'cities',
    onDelete: 'CASCADE',
  });

  private companyForeignKey = new TableForeignKey({
    columnNames: ['company_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'companies',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKeys(this.table, [
      this.cityForeignKey,
      this.companyForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.table, [
      this.cityForeignKey,
      this.companyForeignKey,
    ]);
    await queryRunner.dropTable(this.table);
  }
}
