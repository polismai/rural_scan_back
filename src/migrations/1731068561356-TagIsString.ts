import { MigrationInterface, QueryRunner } from "typeorm";

export class TagIsString1731068561356 implements MigrationInterface {
    name = 'TagIsString1731068561356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "UQ_6f5e29679673ca446f6296711a3"`);
        await queryRunner.query(`ALTER TABLE "animal" DROP COLUMN "tag"`);
        await queryRunner.query(`ALTER TABLE "animal" ADD "tag" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "UQ_6f5e29679673ca446f6296711a3" UNIQUE ("tag")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "UQ_6f5e29679673ca446f6296711a3"`);
        await queryRunner.query(`ALTER TABLE "animal" DROP COLUMN "tag"`);
        await queryRunner.query(`ALTER TABLE "animal" ADD "tag" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "UQ_6f5e29679673ca446f6296711a3" UNIQUE ("tag")`);
    }

}
