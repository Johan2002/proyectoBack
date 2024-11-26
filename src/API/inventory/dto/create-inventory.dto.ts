import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { IEmployee } from 'src/Data/interfaces/api/employee-interface/employee.interface';
import { IHeadquarter } from 'src/Data/interfaces/api/headquarter-interface/headquarter.interface';
import { IinventoryDetail } from 'src/Data/interfaces/api/inventoryDetail-interface/inventoryDetail.interface';

export class CreateInventoryDto {
  @ApiProperty({ description: 'ID Empleado' })
  @IsUUID()
  @IsNotEmpty()
  employee: IEmployee;
  @ApiProperty({ description: 'ID Sede' })
  @IsUUID()
  @IsNotEmpty()
  headquarter: IHeadquarter;
  @ApiProperty({ description: 'ID detalles del inventario' })
  @IsUUID()
  @IsNotEmpty()
  inventoryDetail: IinventoryDetail;
}
