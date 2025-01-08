import {
  Table,
  QueryRunner,
  TableForeignKey,
  MigrationInterface,
} from "typeorm";

export class CreateTablePagesConfigurations1702296908514
  implements MigrationInterface
{
  private table = new Table({
    name: "pages_configurations",
    columns: [
      {
        name: "id",
        type: "int",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment",
      },
      {
        name: "domain",
        type: "varchar",
      },
      {
        name: "cookies",
        type: "boolean",
      },
      {
        name: "facebook_pixel",
        type: "varchar",
        isNullable: true,
      },
      {
        name: "tiktok_pixel",
        type: "varchar",
        isNullable: true,
      },
      {
        name: "kwai_pixel",
        type: "varchar",
        isNullable: true,
      },
      {
        name: "url",
        type: "varchar",
      },
      {
        name: "checkout_url",
        type: "varchar",
      },
      {
        name: "hidden_elements",
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
