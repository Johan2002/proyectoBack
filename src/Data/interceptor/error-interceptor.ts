import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class TransformAndExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    console.log(`Manejo de la solicitud ${method} ${url}...`);

    return next.handle().pipe(
      catchError((err) => {
        console.error(`Error en la ruta ${url}:`, err.message);

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Error interno del servidor';

        if (err instanceof HttpException) {
          status = err.getStatus();
          const response = err.getResponse();

          if (typeof response === 'string') {
            message = response;
          } else if (typeof response === 'object' && response !== null) {
            message = (response as any).message || 'Error desconocido';
          }
        }

        return throwError(
          new HttpException(
            {
              success: false,
              message: message,
              statusCode: status,
            },
            status,
          ),
        );
      }),
      map((data) => ({
        success: true,
        data: data,
      })),
      tap(() => {
        const elapsedTime = Date.now() - now;
        console.log(
          `La solicitud ${url} se ha ejecutado con éxito en ${elapsedTime}ms`,
        );
      }),
    );
  }
}
