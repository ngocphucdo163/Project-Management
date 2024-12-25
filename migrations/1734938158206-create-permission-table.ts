import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserPermission1734938158206 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.permissions (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" timestamp NOT NULL DEFAULT now(),
                "updatedAt" timestamp NOT NULL DEFAULT now(),
                "name" varchar NOT NULL,
                CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY (id),
                CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE (name)
            );   
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE public.permissions;')
    }

}
