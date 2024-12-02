import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableColumnsToPotrero1733150825481 implements MigrationInterface {
    name = 'AddNullableColumnsToPotrero1733150825481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "potrero" ALTER COLUMN "totalHectares" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "potrero" ALTER COLUMN "netHectares" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "potrero" ALTER COLUMN "forageStatus" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "potrero" ALTER COLUMN "forageStatus" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "potrero" ALTER COLUMN "netHectares" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "potrero" ALTER COLUMN "totalHectares" SET NOT NULL`);
    }

}
