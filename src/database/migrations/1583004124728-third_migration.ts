import {MigrationInterface, QueryRunner} from "typeorm";

export class thirdMigration1583004124728 implements MigrationInterface {
    name = 'thirdMigration1583004124728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refundableInvoiceReport" ("id" SERIAL NOT NULL, "type" character varying(255) DEFAULT 'N/A', "rnc" character varying(255) NOT NULL, "ncf" character varying(255) NOT NULL, "invoiceDate" date NOT NULL, "details" character varying(255), "businessType" character varying(255) NOT NULL, "provider" character varying(255) NOT NULL, "paymentMethod" character varying(255) NOT NULL, "subTotal" numeric(19,2) NOT NULL, "itbis" numeric(19,2) NOT NULL, "tip" numeric(19,2) NOT NULL, "total" numeric(19,2) NOT NULL, "status" character varying(255) NOT NULL DEFAULT 'Pendiente', "hasTip" character varying NOT NULL DEFAULT 'false', "hasItibis" character varying NOT NULL DEFAULT 'false', "userId" integer NOT NULL, CONSTRAINT "UQ_30755b307a172644a06e51a576f" UNIQUE ("ncf"), CONSTRAINT "PK_4b8445a0f72a71b38aaaca6da5f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "refundableInvoiceReport" ADD CONSTRAINT "FK_cfa2ce5d9c2499a44a152bf0ff2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refundableInvoiceReport" DROP CONSTRAINT "FK_cfa2ce5d9c2499a44a152bf0ff2"`, undefined);
        await queryRunner.query(`DROP TABLE "refundableInvoiceReport"`, undefined);
    }

}
