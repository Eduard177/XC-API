import {MigrationInterface, QueryRunner} from 'typeorm';

// tslint:disable-next-line:class-name
export class firstMigration1582991005205 implements MigrationInterface {
    name = 'firstMigration1582991005205';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "fullName" character varying(255) NOT NULL, "office" character varying(255) NOT NULL, "position" character varying(255) NOT NULL, "companyCode" character varying(255) NOT NULL, "cellphone" character varying(255) NOT NULL, "imageUrl" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(25) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_035190f70c9aff0ef331258d28b" UNIQUE ("fullName"), CONSTRAINT "UQ_74f11c691a72a5b3d58657ffcdf" UNIQUE ("office"), CONSTRAINT "UQ_fb3e12ff405704f58e81b2e92de" UNIQUE ("position"), CONSTRAINT "UQ_39cb50321e57ce8fd5a2e216d5b" UNIQUE ("companyCode"), CONSTRAINT "UQ_65964723c91566b00580a6cf222" UNIQUE ("cellphone"), CONSTRAINT "UQ_7702daaa8e3b4f2d0b32601c9b2" UNIQUE ("imageUrl"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
