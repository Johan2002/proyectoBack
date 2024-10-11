import { Permission } from "src/Data/entities/permission-entity/permisson.entity";
import { User } from "src/Data/entities/user-entity/user.entity";

export interface IRol{

  rolId: number;
  name: string;
  user: Array<User>;
  permission: Array<Permission>;
  
}