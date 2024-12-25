import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskTable1735024504966 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.tasks (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            "createdAt" timestamp NOT NULL DEFAULT now(),
            "updatedAt" timestamp NOT NULL DEFAULT now(),
            title varchar NOT NULL,
            description varchar NULL,
            status public.task_status_enum NOT NULL DEFAULT 'PENDING'::task_status_enum,
            "projectId" uuid NULL,
            CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id),
            CONSTRAINT "UQ_067be4bd67747aa64451933929e" UNIQUE (title)
        );
        `)
        await queryRunner.query(`
            ALTER TABLE public.tasks ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES public.projects(id);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
