import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailToCompany1730899380944 implements MigrationInterface {
    name = 'AddEmailToCompany1730899380944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "email" character varying NOT NULL DEFAULT 'mail@mail.com'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "email"`);
    }

}
