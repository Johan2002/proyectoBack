import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'rol';
export const Roles = (...rol: Array<string>) => SetMetadata(ROLES_KEY, rol);
