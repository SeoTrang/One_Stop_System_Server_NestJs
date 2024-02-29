import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDepartmentTable1708919580284 implements MigrationInterface {
    name = 'CreateDepartmentTable1708919580284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`department\``);
    }

}
