import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1677020646345 implements MigrationInterface {
    name = 'firstMigration1677020646345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refundableInvoiceReport" ("id" SERIAL NOT NULL, "type" character varying(255) DEFAULT 'N/A', "rnc" character varying(255) NOT NULL, "ncf" character varying(255) NOT NULL, "invoiceDate" date NOT NULL, "details" character varying(255), "businessType" character varying(255) NOT NULL, "provider" character varying(255) NOT NULL, "paymentMethod" character varying(255) NOT NULL, "subTotal" numeric(19,2) NOT NULL, "itbis" numeric(19,2) NOT NULL, "tip" numeric(19,2) NOT NULL, "total" numeric(19,2) NOT NULL, "status" character varying(255) NOT NULL DEFAULT 'Pendiente', "hasTip" character varying NOT NULL DEFAULT 'false', "hasItbis" character varying NOT NULL DEFAULT 'false', "userId" integer NOT NULL, CONSTRAINT "UQ_30755b307a172644a06e51a576f" UNIQUE ("ncf"), CONSTRAINT "PK_4b8445a0f72a71b38aaaca6da5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "fullName" character varying(255) NOT NULL, "office" character varying(255) NOT NULL, "position" character varying(255) NOT NULL, "companyCode" character varying(255) NOT NULL, "cellphone" character varying(255) NOT NULL, "imageUrl" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(25) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_39cb50321e57ce8fd5a2e216d5b" UNIQUE ("companyCode"), CONSTRAINT "UQ_65964723c91566b00580a6cf222" UNIQUE ("cellphone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "minorExpensesReport" ("id" SERIAL NOT NULL, "invoiceDate" date NOT NULL, "description" character varying(255) NOT NULL, "place" character varying(255) NOT NULL, "comment" character varying(255) NOT NULL DEFAULT 'N/A', "witnesses" character varying(255) NOT NULL, "total" numeric(19,2) NOT NULL, "status" character varying(255) NOT NULL DEFAULT 'Pendiente', "userId" integer NOT NULL, CONSTRAINT "PK_0abcf4631326297a3af789ecb04" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refundableInvoiceReport" ADD CONSTRAINT "FK_cfa2ce5d9c2499a44a152bf0ff2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "minorExpensesReport" ADD CONSTRAINT "FK_7872f34e21a75c969d2d363feaa" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "minorExpensesReport" DROP CONSTRAINT "FK_7872f34e21a75c969d2d363feaa"`);
        await queryRunner.query(`ALTER TABLE "refundableInvoiceReport" DROP CONSTRAINT "FK_cfa2ce5d9c2499a44a152bf0ff2"`);
        await queryRunner.query(`DROP TABLE "minorExpensesReport"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "refundableInvoiceReport"`);
    }

}
