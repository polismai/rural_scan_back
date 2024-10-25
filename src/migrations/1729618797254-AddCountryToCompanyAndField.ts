import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCountryToCompanyAndField1729618797254 implements MigrationInterface {
    name = 'AddCountryToCompanyAndField1729618797254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "country" character varying NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE "field" ADD "country" character varying NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "active" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "active" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "country"`);
    }

}
