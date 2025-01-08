import {
  Table,
  QueryRunner,
  TableForeignKey,
  MigrationInterface,
} from "typeorm";

export class CreateTablePagesColors1702296908515
  implements MigrationInterface
{
  private table = new Table({
    name: "pages_colors",
    columns: [
      {
        name: "id",
        type: "int",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment",
      },
      {
        name: "page_id",
        type: "int",
      },
      {
        name: "current",
        type: "varchar",
      },
      {
        name: "replace",
        type: "varchar",
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

  private pageForeignKey = new TableForeignKey({
    columnNames: ["page_id"],
    referencedColumnNames: ["id"],
    onDelete: "CASCADE",
    referencedTableName: "pages_configurations",
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKeys(this.table, [
      this.pageForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.table, [
      this.pageForeignKey,
    ]);
    await queryRunner.dropTable(this.table);
  }
}
