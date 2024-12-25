import { SetMetadata } from '@nestjs/common';
import { UserPermission } from '../enum';

export const Permissions = (...permissions: UserPermission[]) =>
  SetMetadata('permissions', permissions);
