export enum EPermission {
  //Permisos admin
  ADMIN_ALL = 'ALL_PERMISSION',
  // Permisos de usuario
  USER_CREATE = 'USER_CREATE',
  USER_READ = 'USER_READ',
  USER_UPDATE = 'USER_UPDATE',
  USER_DELETE = 'USER_DELETE',

  // Permisos de roles
  ROLE_CREATE = 'ROLE_CREATE',
  ROLE_READ = 'ROLE_READ',
  ROLE_UPDATE = 'ROLE_UPDATE',
  ROLE_DELETE = 'ROLE_DELETE',

  // Permisos de ventas
  SALE_CREATE = 'SALE_CREATE',
  SALE_READ = 'SALE_READ',
  SALE_UPDATE = 'SALE_UPDATE',
  SALE_DELETE = 'SALE_DELETE',

  // Permisos de reportes
  REPORT_VIEW = 'REPORT_VIEW',
  REPORT_GENERATE = 'REPORT_GENERATE',

  TEST = 'TEST',
  TEST2 = 'TEST2',
  TEST4 = 'TEST4',
}
