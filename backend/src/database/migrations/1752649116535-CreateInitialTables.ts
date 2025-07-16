import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1752649116535 implements MigrationInterface {
    name = 'CreateInitialTables1752649116535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL, "imageUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
