import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDateField1708919809773 implements MigrationInterface {
    name = 'UpdateDateField1708919809773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`department\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`department\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`department\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`department\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`created_at\``);
    }

}
