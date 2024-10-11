import { Permission } from "src/Data/entities/permission-entity/permisson.entity";
import { User } from "src/Data/entities/user-entity/user.entity";

export interface IRol{

  rolId: string;
  rolName: string;
  rolDescription: string;
  rolStatus: boolean;
  user: Array<User>;
  permission: Array<Permission>;
  
}