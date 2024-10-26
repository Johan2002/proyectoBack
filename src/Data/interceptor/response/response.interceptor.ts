import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IResponse } from 'src/Data/interfaces/data/error-respnse';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  private readonly logger: Logger = new Logger(ResponseInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      tap((data) => {
        if ((0 as number) === 1) this.logger.log(data);
      }),
      map(
        (data) =>
          ({
            status: (data && data.status) ?? 200,
            message:
              ((data && data.message) ?? (data && data.status === 401))
                ? 'UNAUTORIZED'
                : !data
                  ? 'NOT_DATA'
                  : 'SUCCESS',
            result: data ?? {},
          }) as IResponse<T>,
      ),
    );
  }
}
