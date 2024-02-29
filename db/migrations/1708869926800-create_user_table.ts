import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1708869926800 implements MigrationInterface {
    name = 'CreateUserTable1708869926800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`identifier\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`batch\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
