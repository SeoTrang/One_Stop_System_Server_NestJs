import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSomeFieldPostCommentTable1708957513803 implements MigrationInterface {
    name = 'UpdateSomeFieldPostCommentTable1708957513803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_comment\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` DROP FOREIGN KEY \`FK_c7fb3b0d1192f17f7649062f672\``);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`parent_id\` \`parent_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`content\` \`content\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`media_content\` \`media_content\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`postId\` \`postId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c91b8eb1dc23fd5dae700265ed2\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`departmentId\` \`departmentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` DROP FOREIGN KEY \`FK_aaea8f6b6b6fe037df5846211fa\``);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` CHANGE \`postId\` \`postId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` ADD CONSTRAINT \`FK_c7fb3b0d1192f17f7649062f672\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c91b8eb1dc23fd5dae700265ed2\` FOREIGN KEY (\`departmentId\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` ADD CONSTRAINT \`FK_aaea8f6b6b6fe037df5846211fa\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_media_content\` DROP FOREIGN KEY \`FK_aaea8f6b6b6fe037df5846211fa\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c91b8eb1dc23fd5dae700265ed2\``);
        await queryRunner.query(`ALTER TABLE \`post_comment\` DROP FOREIGN KEY \`FK_c7fb3b0d1192f17f7649062f672\``);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` CHANGE \`postId\` \`postId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` ADD CONSTRAINT \`FK_aaea8f6b6b6fe037df5846211fa\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`departmentId\` \`departmentId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c91b8eb1dc23fd5dae700265ed2\` FOREIGN KEY (\`departmentId\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`postId\` \`postId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`media_content\` \`media_content\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`content\` \`content\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`parent_id\` \`parent_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` ADD CONSTRAINT \`FK_c7fb3b0d1192f17f7649062f672\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`post_comment\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`post_comment\` DROP COLUMN \`created_at\``);
    }

}
