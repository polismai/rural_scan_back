import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoordsToField1732711550373 implements MigrationInterface {
    name = 'AddCoordsToField1732711550373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "field" ADD "coords" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "field" DROP COLUMN "coords"`);
    }

}
