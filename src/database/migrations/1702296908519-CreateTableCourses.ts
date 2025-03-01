import { Table, QueryRunner, MigrationInterface } from "typeorm";

export class CreateTableCourses1702296908519 implements MigrationInterface {
  private table = new Table({
    name: "courses",
    columns: [
      {
        name: "id",
        type: "int",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment",
      },
      {
        name: "name",
        type: "varchar",
      },
      {
        name: "description",
        type: "varchar",
      },
      {
        name: "status",
        type: "varchar",
      },
      {
        name: "value",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: false,
      },
      {
        name: "image",
        type: "varchar",
      },
      {
        name: "duration",
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

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
