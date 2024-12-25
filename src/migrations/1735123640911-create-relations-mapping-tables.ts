import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationsMappingTables1735123640911 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE public.project_members_users (
                "projectsId" uuid NOT NULL,
                "usersId" uuid NOT NULL,
                CONSTRAINT "PK_9cbfd5f30a8f15a076a5f15b26f" PRIMARY KEY ("projectsId", "usersId")
            );
            CREATE INDEX "IDX_17cf14cfac29c27dfaf3f66eb6" ON public.project_members_users USING btree ("usersId");
            CREATE INDEX "IDX_43d8bc0bb06986a0a22b587529" ON public.project_members_users USING btree ("projectsId");


            -- public.project_members_users foreign keys

            ALTER TABLE public.project_members_users ADD CONSTRAINT "FK_17cf14cfac29c27dfaf3f66eb65" FOREIGN KEY ("usersId") REFERENCES public.users(id);
            ALTER TABLE public.project_members_users ADD CONSTRAINT "FK_43d8bc0bb06986a0a22b5875292" FOREIGN KEY ("projectsId") REFERENCES public.projects(id) ON DELETE CASCADE ON UPDATE CASCADE;
        `)

        await queryRunner.query(`
            CREATE TABLE public.role_permissions (
                "rolesId" uuid NOT NULL,
                "permissionsId" uuid NOT NULL,
                CONSTRAINT "PK_7931614007a93423204b4b73240" PRIMARY KEY ("rolesId", "permissionsId")
            );
            CREATE INDEX "IDX_0cb93c5877d37e954e2aa59e52" ON public.role_permissions USING btree ("rolesId");
            CREATE INDEX "IDX_d422dabc78ff74a8dab6583da0" ON public.role_permissions USING btree ("permissionsId");


            -- public.role_permissions foreign keys

            ALTER TABLE public.role_permissions ADD CONSTRAINT "FK_0cb93c5877d37e954e2aa59e52c" FOREIGN KEY ("rolesId") REFERENCES public.roles(id) ON DELETE CASCADE ON UPDATE CASCADE;
            ALTER TABLE public.role_permissions ADD CONSTRAINT "FK_d422dabc78ff74a8dab6583da02" FOREIGN KEY ("permissionsId") REFERENCES public.permissions(id) ON DELETE CASCADE ON UPDATE CASCADE;
        `)

        await queryRunner.query(`
            CREATE TABLE public.task_assignees_users (
                "tasksId" uuid NOT NULL,
                "usersId" uuid NOT NULL,
                CONSTRAINT "PK_82637e5a40efef8be0fec2e5148" PRIMARY KEY ("tasksId", "usersId")
            );
            CREATE INDEX "IDX_06d2f01cf4a5473482c3cb948c" ON public.task_assignees_users USING btree ("tasksId");
            CREATE INDEX "IDX_69839cd5a157b14063c8783fe9" ON public.task_assignees_users USING btree ("usersId");


            -- public.task_assignees_users foreign keys

            ALTER TABLE public.task_assignees_users ADD CONSTRAINT "FK_06d2f01cf4a5473482c3cb948c3" FOREIGN KEY ("tasksId") REFERENCES public.tasks(id) ON DELETE CASCADE ON UPDATE CASCADE;
            ALTER TABLE public.task_assignees_users ADD CONSTRAINT "FK_69839cd5a157b14063c8783fe98" FOREIGN KEY ("usersId") REFERENCES public.users(id);
        `)


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
