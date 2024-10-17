import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-costumer.dto';

export class UpdateCostumerDto extends PartialType(CreateCustomerDto) {}
