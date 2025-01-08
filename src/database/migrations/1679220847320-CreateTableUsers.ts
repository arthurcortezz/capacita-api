import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableUsers1679220847320
  implements MigrationInterface
{
  private readonly table = new Table({
    name: "users",
    columns: [
      {
        name: "id",
        type: "int",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment",
      },
      {
        name: "role_id",
        type: "int",
      },
      {
        name: "company_id",
        type: "int",
        isNullable: true,
      },
      {
        name: "name",
        type: "varchar",
        length: "255",
      },
      {
        name: "email",
        type: "varchar",
        length: "255",
        isUnique: true,
      },
      {
        name: "person_type",
        type: "enum",
        enum: ["FÍSICA", "JURÍDICA"],
      },
      {
        name: "identification_number",
        type: "varchar",
        length: "255",
        isUnique: true,
      },
      {
        name: "phone",
        type: "varchar",
        length: "255",
      },
      {
        name: "plan",
        type: "varchar",
        length: "255",
        isNullable: true,
      },
      {
        name: "password",
        type: "varchar",
        length: "255",
      },
      {
        name: "remember_token",
        type: "varchar",
        length: "255",
        isNullable: true,
      },
      {
        name: "reset_password_at",
        type: "timestamp",
        isNullable: true,
      },
      {
        name: "accepted_at",
        type: "timestamp",
        isNullable: true,
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

  private readonly roleForeignKey = new TableForeignKey({
    columnNames: ["role_id"],
    referencedColumnNames: ["id"],
    referencedTableName: "roles",
    onDelete: "CASCADE",
  });

  private readonly companyForeignKey = new TableForeignKey({
    columnNames: ["company_id"],
    referencedColumnNames: ["id"],
    referencedTableName: "companies",
    onDelete: "CASCADE",
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKeys(this.table, [
      this.roleForeignKey,
      this.companyForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.table, [
      this.roleForeignKey,
      this.companyForeignKey,
    ]);
    await queryRunner.dropTable(this.table);
  }
}
