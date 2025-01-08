import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableUsersAddress1695391102734
  implements MigrationInterface
{
  private table = new Table({
    name: 'users_address',
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
        name: 'user_id',
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

  private userForeignKey = new TableForeignKey({
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKeys(this.table, [
      this.cityForeignKey,
      this.userForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.table, [
      this.cityForeignKey,
      this.userForeignKey,
    ]);
    await queryRunner.dropTable(this.table);
  }
}
