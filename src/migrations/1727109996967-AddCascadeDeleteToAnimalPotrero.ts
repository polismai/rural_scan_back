import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeDeleteToAnimalPotrero1727109996967 implements MigrationInterface {
    name = 'AddCascadeDeleteToAnimalPotrero1727109996967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animal_potrero" DROP CONSTRAINT "FK_fd74f99794d27775d9b4ab01fda"`);
        await queryRunner.query(`ALTER TABLE "animal_potrero" ADD CONSTRAINT "FK_fd74f99794d27775d9b4ab01fda" FOREIGN KEY ("animalId") REFERENCES "animal"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animal_potrero" DROP CONSTRAINT "FK_fd74f99794d27775d9b4ab01fda"`);
        await queryRunner.query(`ALTER TABLE "animal_potrero" ADD CONSTRAINT "FK_fd74f99794d27775d9b4ab01fda" FOREIGN KEY ("animalId") REFERENCES "animal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
