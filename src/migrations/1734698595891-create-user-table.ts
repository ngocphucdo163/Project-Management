import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1734698595891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'manager', 'contributor');
          `);

        await queryRunner.query(
            `
                CREATE TABLE public.users (
                    id uuid NOT NULL DEFAULT uuid_generate_v4(),
                    "createdAt" timestamp NOT NULL DEFAULT now(),
                    "updatedAt" timestamp NOT NULL DEFAULT now(),
                    email varchar NOT NULL,
                    username varchar NOT NULL,
                    "password" varchar NOT NULL,
                    "role" public."users_role_enum" NOT NULL DEFAULT 'contributor'::users_role_enum,
                    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id),
                    CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email)
                );
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE public.users;`);
    }

}
