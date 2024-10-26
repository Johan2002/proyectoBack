import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTaxDto {
  @ApiProperty({ description: 'Nombre del impuesto' })
  @IsString()
  taxName: string;

  @ApiProperty({ description: 'Porcentaje del impuesto' })
  @IsNumber()
  taxPorcentage: number;
}
