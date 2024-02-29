import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostMediaContentTable1708940811538 implements MigrationInterface {
    name = 'CreatePostMediaContentTable1708940811538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_media_content\` DROP FOREIGN KEY \`FK_aaea8f6b6b6fe037df5846211fa\``);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` CHANGE \`postId\` \`postId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c91b8eb1dc23fd5dae700265ed2\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`departmentId\` \`departmentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` ADD CONSTRAINT \`FK_aaea8f6b6b6fe037df5846211fa\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c91b8eb1dc23fd5dae700265ed2\` FOREIGN KEY (\`departmentId\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c91b8eb1dc23fd5dae700265ed2\``);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` DROP FOREIGN KEY \`FK_aaea8f6b6b6fe037df5846211fa\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`departmentId\` \`departmentId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c91b8eb1dc23fd5dae700265ed2\` FOREIGN KEY (\`departmentId\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` CHANGE \`postId\` \`postId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` ADD CONSTRAINT \`FK_aaea8f6b6b6fe037df5846211fa\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
