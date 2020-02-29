import {MigrationInterface, QueryRunner} from "typeorm";

export class fourthMigration1583013609889 implements MigrationInterface {
    name = 'fourthMigration1583013609889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "minorExpensesReport" ("id" SERIAL NOT NULL, "invoiceDate" date NOT NULL, "description" character varying(255) NOT NULL, "place" character varying(255) NOT NULL, "comment" character varying(255) NOT NULL DEFAULT 'N/A', "witnesses" character varying(255) NOT NULL, "total" numeric(19,2) NOT NULL, "status" character varying(255) NOT NULL DEFAULT 'Pendiente', "userId" integer NOT NULL, CONSTRAINT "PK_0abcf4631326297a3af789ecb04" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "minorExpensesReport" ADD CONSTRAINT "FK_7872f34e21a75c969d2d363feaa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "minorExpensesReport" DROP CONSTRAINT "FK_7872f34e21a75c969d2d363feaa"`, undefined);
        await queryRunner.query(`DROP TABLE "minorExpensesReport"`, undefined);
    }

}
