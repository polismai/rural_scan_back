import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullableCrossbreed1725828762802 implements MigrationInterface {
  name = 'AddNullableCrossbreed1725828762802';

  public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animal_potrero" DROP CONSTRAINT "FK_fd74f99794d27775d9b4ab01fda"`);
        await queryRunner.query(`ALTER TABLE "animal_potrero" DROP CONSTRAINT "FK_807c79d141fa345f16a26a648cf"`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "crossbreed" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "motherTag" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "fatherTag" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "disappearanceDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "inseminationDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "calvingDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal_potrero" ADD CONSTRAINT "FK_fd74f99794d27775d9b4ab01fda" FOREIGN KEY ("animalId") REFERENCES "animal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animal_potrero" ADD CONSTRAINT "FK_807c79d141fa345f16a26a648cf" FOREIGN KEY ("potreroId") REFERENCES "potrero"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animal_potrero" DROP CONSTRAINT "FK_807c79d141fa345f16a26a648cf"`);
        await queryRunner.query(`ALTER TABLE "animal_potrero" DROP CONSTRAINT "FK_fd74f99794d27775d9b4ab01fda"`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "calvingDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "inseminationDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "disappearanceDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "fatherTag" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "motherTag" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal" ALTER COLUMN "crossbreed" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "animal_potrero" ADD CONSTRAINT "FK_807c79d141fa345f16a26a648cf" FOREIGN KEY ("potreroId") REFERENCES "potrero"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animal_potrero" ADD CONSTRAINT "FK_fd74f99794d27775d9b4ab01fda" FOREIGN KEY ("animalId") REFERENCES "animal"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
