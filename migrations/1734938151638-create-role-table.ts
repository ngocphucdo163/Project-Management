import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserRole1734938151638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE public.roles (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            "createdAt" timestamp NOT NULL DEFAULT now(),
            "updatedAt" timestamp NOT NULL DEFAULT now(),
            "name" varchar NOT NULL,
            permissions text NOT NULL,
            CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id),
            CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE (name)
        );  
        `)

        await queryRunner.query(`            
            ALTER TABLE public.users ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY (role_id) REFERENCES public.roles(id);    
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE public.roles;')
    }

}
