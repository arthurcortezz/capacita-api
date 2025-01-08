import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableParameters1698425884544 implements MigrationInterface {
  private table = new Table({
    name: 'parameters',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'key',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'description',
        type: 'text',
      },
      {
        name: 'value',
        type: 'text',
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
