import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDetailDto } from './create-inventory-detail.dto';

export class UpdateInventoryDetailDto extends PartialType(CreateInventoryDetailDto) {}
