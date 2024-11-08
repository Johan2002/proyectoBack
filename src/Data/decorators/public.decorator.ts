import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../constants/definitions.constant';

export const Public = () => SetMetadata(PUBLIC_KEY, true);
