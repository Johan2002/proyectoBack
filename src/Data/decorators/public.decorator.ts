import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../constants/key-decorator';

export const Public = () => SetMetadata(PUBLIC_KEY, true);
