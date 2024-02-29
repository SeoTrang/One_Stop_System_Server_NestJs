import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostReactionTable1708961603502 implements MigrationInterface {
    name = 'CreatePostReactionTable1708961603502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post_reaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`type_user\` varchar(255) NOT NULL, \`postId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` DROP FOREIGN KEY \`FK_c7fb3b0d1192f17f7649062f672\``);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`parent_id\` \`parent_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`content\` \`content\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`media_content\` \`media_content\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`postId\` \`postId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` DROP FOREIGN KEY \`FK_aaea8f6b6b6fe037df5846211fa\``);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` CHANGE \`postId\` \`postId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c91b8eb1dc23fd5dae700265ed2\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`departmentId\` \`departmentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` ADD CONSTRAINT \`FK_c7fb3b0d1192f17f7649062f672\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` ADD CONSTRAINT \`FK_aaea8f6b6b6fe037df5846211fa\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c91b8eb1dc23fd5dae700265ed2\` FOREIGN KEY (\`departmentId\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_reaction\` ADD CONSTRAINT \`FK_5e7b98f3cea583c73a0bbbe0de1\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_reaction\` DROP FOREIGN KEY \`FK_5e7b98f3cea583c73a0bbbe0de1\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c91b8eb1dc23fd5dae700265ed2\``);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` DROP FOREIGN KEY \`FK_aaea8f6b6b6fe037df5846211fa\``);
        await queryRunner.query(`ALTER TABLE \`post_comment\` DROP FOREIGN KEY \`FK_c7fb3b0d1192f17f7649062f672\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`departmentId\` \`departmentId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_c91b8eb1dc23fd5dae700265ed2\` FOREIGN KEY (\`departmentId\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` CHANGE \`postId\` \`postId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post_media_content\` ADD CONSTRAINT \`FK_aaea8f6b6b6fe037df5846211fa\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`postId\` \`postId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`media_content\` \`media_content\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`content\` \`content\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` CHANGE \`parent_id\` \`parent_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`post_comment\` ADD CONSTRAINT \`FK_c7fb3b0d1192f17f7649062f672\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`post_reaction\``);
    }

}
