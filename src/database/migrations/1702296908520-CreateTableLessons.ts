import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableLessons1702296908520 implements MigrationInterface {
  private table = new Table({
    name: "lessons",
    columns: [
      {
        name: "id",
        type: "int",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment",
      },
      {
        name: "course_id",
        type: "int",
      },
      {
        name: "order",
        type: "int",
      },
      {
        name: "title",
        type: "varchar",
      },
      {
        name: "pdfUrl",
        type: "varchar",
        isNullable: false,
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

  private foreignKey = new TableForeignKey({
    columnNames: ["course_id"],
    referencedTableName: "courses",
    referencedColumnNames: ["id"],
    onDelete: "CASCADE",
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey("lessons", this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("lessons", this.foreignKey);
    await queryRunner.dropTable(this.table);
  }
}
