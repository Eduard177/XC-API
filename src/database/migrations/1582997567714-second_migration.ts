import {MigrationInterface, QueryRunner} from 'typeorm';

// tslint:disable-next-line:class-name
export class secondMigration1582997567714 implements MigrationInterface {
    name = 'secondMigration1582997567714';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_035190f70c9aff0ef331258d28b"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_74f11c691a72a5b3d58657ffcdf"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_fb3e12ff405704f58e81b2e92de"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_7702daaa8e3b4f2d0b32601c9b2"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_7702daaa8e3b4f2d0b32601c9b2" UNIQUE ("imageUrl")`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_fb3e12ff405704f58e81b2e92de" UNIQUE ("position")`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_74f11c691a72a5b3d58657ffcdf" UNIQUE ("office")`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_035190f70c9aff0ef331258d28b" UNIQUE ("fullName")`, undefined);
    }

}
