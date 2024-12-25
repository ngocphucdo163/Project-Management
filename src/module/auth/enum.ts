export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  CONTRIBUTOR = 'contributor',
}

export enum UserPermission {
  MANAGE_USERS = 'manage_users',
  MANAGE_PROJECTS = 'manage_projects',
  VIEW_PROJECTS = 'view_projects',
  ASSIGN_ROLES = 'assign_roles',
  CREATE_TASKS = 'create_tasks',
  VIEW_TASKS = 'view_tasks',
  ASSIGN_TASKS = 'assign_tasks',
  UPDATE_TASKS = 'update_tasks',
}
