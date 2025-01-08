import {
  Table,
  QueryRunner,
  TableForeignKey,
  MigrationInterface,
} from "typeorm";

export class CreateTableDomains1702296908518
  implements MigrationInterface
{
  private table = new Table({
    name: "domains",
    columns: [
      {
        name: "id",
        type: "int",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment",
      },
      {
        name: "url",
        type: "varchar",
      },
      {
        name: "status",
        type: "varchar",
      },
      {
        name: "type",
        type: "varchar",
      },
      {
        name: "user_id",
        type: "int",
      },
      {
        name: "created_at",
        type: "timestamp",
        default: "now()",
      },
      {
        name: "updated_at",
        type: "timestamp",
        default: "now()",
      },
      {
        name: "deleted_at",
        type: "timestamp",
        isNullable: true,
      },
    ],
  });

  private userForeignKey = new TableForeignKey({
    columnNames: ["user_id"],
    referencedColumnNames: ["id"],
    onDelete: "CASCADE",
    referencedTableName: "users",
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKeys(this.table, [
      this.userForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.table, [
      this.userForeignKey,
    ]);
    await queryRunner.dropTable(this.table);
  }
}
