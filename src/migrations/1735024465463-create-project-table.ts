import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectTable1735024465463 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.projects (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            "createdAt" timestamp NOT NULL DEFAULT now(),
            "updatedAt" timestamp NOT NULL DEFAULT now(),
            "name" varchar NOT NULL,
            description varchar NULL,
            CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY (id)
        );  
      `)

        await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_2187088ab5ef2a918473cb99007" ON public.projects USING btree (name);
        `)

        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE public.projects;')
    }

}
