import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveToField1728407956879 implements MigrationInterface {
    name = 'AddIsActiveToField1728407956879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "field" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "isActive"`);
    }

}
